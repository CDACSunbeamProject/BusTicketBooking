package com.project.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Collectors;


import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.project.custom_exceptions.ResourceNotFoundException;
import com.project.daos.BookingDao;
import com.project.daos.BusDao;
import com.project.daos.SeatAvailabilityDao;
import com.project.daos.UserDao;
import com.project.dto.BookingRequestDTO;
import com.project.dto.BookingRespDTO;
import com.project.dto.SeatAvailabilityDTO;
import com.project.entities.Booking;
import com.project.entities.BookingStatus;
import com.project.entities.Bus;
import com.project.entities.PaymentStatus;
import com.project.entities.Seat;
import com.project.entities.SeatStatus;
import com.project.entities.User;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BookingServiceImpl implements BookingService{
	
	public final SeatAvailabilityDao seatDao;
	private final ModelMapper modelMapper;
	private final BookingDao bookDao;
	private final BusDao busDao;
	private final UserDao userDao;
	private final RazorpayClient razorpayClient;
	
	
	public Booking createBooking(BookingRequestDTO request) {
        Booking booking = new Booking();
        
        Bus bus = busDao.findById(request.getBusId())
        		.orElseThrow(() -> new ResourceNotFoundException("Bus not found"));
        booking.setBus(bus);
        
        booking.setSeatNumbers(request.getSelectedSeats());
        booking.setTotalFare(request.getTotalAmount());
        
        User user = userDao.findById(request.getUserId())
        	    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        booking.setUser(user);
        
        booking.setStatus(BookingStatus.PENDING);

        // convert PassengerDTO list to Passenger entities, set to booking
        // save booking
        return bookDao.save(booking);
    }
	
	
	/*public SeatAvailabilityDTO confirmBooking(Long seatId, Long userId) {
	    Seat seat = seatDao.findByIdAndLock(seatId)
	            .orElseThrow(() -> new RuntimeException("Seat not found"));

	    if (!SeatStatus.LOCKED.equals(seat.getStatus()) || !seat.getLockedByUserId().equals(userId)) {
	        throw new RuntimeException("Seat not locked or locked by another user");
	    }

	    seat.setStatus(SeatStatus.BOOKED);
	    //seat.setLockedByUserId(null); // clear lock
	    seat.setLockTime(null);

	    return modelMapper.map(seatDao.save(seat), SeatAvailabilityDTO.class);
	}*/

	/*@Override
	public List<BookingRespDTO> getBookingsByUserId(Long userId) {
		// TODO: Implement when BookingDao is available
		return Collections.emptyList();
	}*/

	@Override
	public List<BookingRespDTO> getAllBookings() {
		 List<Booking> bookings = bookDao.findAll();

		    return bookings.stream()
		            .map(booking -> modelMapper.map(booking, BookingRespDTO.class))
		            .collect(Collectors.toList());
	}

	
	
	@Scheduled(fixedRate = 600000) // run every 10 minute
	public void releaseExpiredLocks() {
	    List<Seat> expiredSeats = seatDao.findExpiredLocks(LocalDateTime.now());
	    for (Seat seat : expiredSeats) {
	        seat.setStatus(SeatStatus.AVAILABLE);
	        seat.setLockedByUserId(null);
	        seat.setLockTime(null);
	        seat.setLockExpiryTime(null);
	    }
	    seatDao.saveAll(expiredSeats);
	}


	@Override
	public Order createRazorpayOrder(double totalFare, Long id) {
	    JSONObject options = new JSONObject();
	    options.put("amount", (int)(totalFare * 100)); // amount in paise
	    options.put("currency", "INR");
	    options.put("receipt", id.toString());
	    options.put("payment_capture", 1);

	    try {
	        return razorpayClient.orders.create(options);
	    } catch (RazorpayException e) {
	        e.printStackTrace();
	        // You can either:
	        // - throw a custom unchecked exception
	        // - return null (not recommended)
	        throw new RuntimeException("Failed to create Razorpay order", e);
	    }
	}


	@Override
	public void updatePaymentStatus(Long bookingId, BookingStatus status) {
		// Fetch booking by ID
	    Booking booking = bookDao.findById(bookingId)
	            .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

	    // Update payment status
	    booking.setStatus(status);

	    // Save updated booking
	    bookDao.save(booking);
		
	}


	/*@Override
	public List<SeatAvailabilityDTO> lockMultipleSeats(List<Long> seatIds, Long userId) {
		List<SeatAvailabilityDTO> lockedSeats = new ArrayList<>();
	    for (Long seatId : seatIds) {
	    	Seat seat = seatDao.findById(seatId)
	                .orElseThrow(() -> new ResourceNotFoundException("Seat not found: " + seatId));
	            
	    		if (seat.getStatus() != SeatStatus.AVAILABLE) {
	                throw new IllegalStateException("Seat not available: " + seatId);
	            }
	            seat.setStatus(SeatStatus.LOCKED);
	            seat.setLockedByUserId(userId);
	            seat.setLockTime(LocalDateTime.now());
	            seat.setLockExpiryTime(LocalDateTime.now().plusMinutes(15));
	            Seat savedSeat = seatDao.save(seat);
	            lockedSeats.add(modelMapper.map(savedSeat, SeatAvailabilityDTO.class));
	    }
	    return lockedSeats;
	}*/
	@Override
	//@Transactional  // important: to keep the lock for the whole method duration
	public List<SeatAvailabilityDTO> bookSeatsWithPessimistic(List<Long> seatIds, Long userId) {
	    List<SeatAvailabilityDTO> lockedSeats = new ArrayList<>();
	    
	    System.out.println(Thread.currentThread().getName() + " is attempting to fetch and lock seats...");
	    
	    for (Long seatId : seatIds) {
	        // fetch seat with pessimistic lock
	        Seat seat = seatDao.findByIdAndLock(seatId);
	        
	        System.out.println(Thread.currentThread().getName() + " acquired lock on seat " + seatId);
	        
	        // Check if seat is already booked or locked
	        if (seat.getStatus() == SeatStatus.BOOKED || seat.getStatus() == SeatStatus.LOCKED) {
	            System.out.println(Thread.currentThread().getName() + " failed to lock seat id: " + seatId);
	            throw new RuntimeException("Seat " + seatId + " is already locked or booked");
	        }
	        
	        // Lock the seat
	        seat.setStatus(SeatStatus.LOCKED);
	        seat.setLockedByUserId(userId);
	        seat.setLockTime(LocalDateTime.now());
	        seat.setLockExpiryTime(LocalDateTime.now().plusMinutes(15));
	        
	        Seat savedSeat = seatDao.save(seat);
	        
	        System.out.println(Thread.currentThread().getName() + " successfully locked seat " + savedSeat.getSeatNumber());
	        
	        lockedSeats.add(modelMapper.map(savedSeat, SeatAvailabilityDTO.class));
	    }
	    
	    return lockedSeats;
	}


	@Override
	public void markSeatsAsBooked(Long bookingId) {
		Booking booking = bookDao.findById(bookingId)
		        .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

		    Long userId = booking.getUser().getId();

		    // Get seats locked by this user for this bus
		    List<Seat> lockedSeats = seatDao.findByLockedByUserIdAndStatusAndBusId(
		        userId, SeatStatus.LOCKED, booking.getBus().getId()
		    );

		    for (Seat seat : lockedSeats) {
		        seat.setStatus(SeatStatus.BOOKED);
		        seat.setBooking(booking); // will set booking_id in DB
		        seat.setLockedByUserId(null);
		        seat.setLockTime(null);
		        seat.setLockExpiryTime(null);
		    }

		    seatDao.saveAll(lockedSeats);
		
	}


	@Override
	public void releaseSeats(Long bookingId) {
		Booking booking = bookDao.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("booking not found"));
		
		Long userId = booking.getUser().getId();

	    // Get seats locked by this user for this bus
	    List<Seat> lockedSeats = seatDao.findByLockedByUserIdAndStatusAndBusId(
	        userId, SeatStatus.LOCKED, booking.getBus().getId()
	    );

	    for (Seat seat : lockedSeats) {
	        seat.setStatus(SeatStatus.AVAILABLE);
	        seat.setBooking(booking); // will set booking_id in DB
	        seat.setLockedByUserId(null);
	        seat.setLockTime(null);
	        seat.setLockExpiryTime(null);
	    }

	    seatDao.saveAll(lockedSeats);
		
	}


	
	
	@Override
	public List<BookingRespDTO> getBookingsByUserId(Long userId) {
	    return bookDao.findByUserId(userId)
	            .stream()
	            .map(booking -> modelMapper.map(booking, BookingRespDTO.class))
	            .collect(Collectors.toList());
	}


	

	/*public Booking getBookingById(Long bookingId) {
		Booking booking = new Booking();
		booking = bookDao.findById(bookingId)
				.orElseThrow(() -> new RuntimeException("booking not found"));
		return booking;
	}*/


	/*@Override
	public List<SeatAvailabilityDTO> lockMultipleSeats(List<Long> seatIds, Long userId) {
		// TODO Auto-generated method stub
		return null;
	}*/
	
}





























