package com.project.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.project.custom_exceptions.ResourceNotFoundException;
import com.project.daos.BookingDao;
import com.project.daos.SeatAvailabilityDao;
import com.project.dto.BookingRespDTO;
import com.project.dto.SeatAvailabilityDTO;
import com.project.entities.Booking;
import com.project.entities.Seat;
import com.project.entities.SeatStatus;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BookingServiceImpl implements BookingService{
	
	public final SeatAvailabilityDao seatDao;
	private final ModelMapper modelMapper;
	
	public SeatAvailabilityDTO lockSeat(Long seatId, Long userId) {
	    Seat seat = seatDao.findByIdAndLock(seatId)
	            .orElseThrow(() -> new RuntimeException("Seat not found"));

	    if (!SeatStatus.AVAILABLE.equals(seat.getStatus())) {
	        throw new RuntimeException("Seat not available");
	    }

	    seat.setStatus(SeatStatus.LOCKED);
	    seat.setLockedByUserId(userId);
	    seat.setLockTime(LocalDateTime.now());

	    return modelMapper.map(seatDao.save(seat), SeatAvailabilityDTO.class);
	}
	
	public SeatAvailabilityDTO confirmBooking(Long seatId, Long userId) {
	    Seat seat = seatDao.findByIdAndLock(seatId)
	            .orElseThrow(() -> new RuntimeException("Seat not found"));

	    if (!SeatStatus.LOCKED.equals(seat.getStatus()) || !seat.getLockedByUserId().equals(userId)) {
	        throw new RuntimeException("Seat not locked or locked by another user");
	    }

	    seat.setStatus(SeatStatus.BOOKED);
	    //seat.setLockedByUserId(null); // clear lock
	    seat.setLockTime(null);

	    return modelMapper.map(seatDao.save(seat), SeatAvailabilityDTO.class);
	}

	@Override
	public List<BookingRespDTO> getBookingsByUserId(Long userId) {
		// TODO: Implement when BookingDao is available
		return Collections.emptyList();
	}

	@Override
	public List<BookingRespDTO> getAllBookings() {
		// TODO: Implement when BookingDao is available
		return Collections.emptyList();
	}

	@Override
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
	
}





























