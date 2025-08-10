package com.project.services;

import java.util.List;

import com.project.dto.BookingRequestDTO;
import com.project.dto.BookingRespDTO;
import com.project.dto.SeatAvailabilityDTO;
import com.project.entities.Booking;
import com.project.entities.BookingStatus;
import com.project.entities.PaymentStatus;
import com.razorpay.Order;

public interface BookingService {
	//public SeatAvailabilityDTO lockSeat(Long seatId, Long userId);
	//public SeatAvailabilityDTO confirmBooking(Long seatId, Long userId);
	public void releaseExpiredLocks();
	//public List<SeatAvailabilityDTO> lockMultipleSeats(List<Long> seatIds, Long userId);
	public List<BookingRespDTO> getAllBookings();
	List<BookingRespDTO> getBookingsByUserId(Long userId);
	Booking createBooking(BookingRequestDTO request);
	public Order createRazorpayOrder(double totalFare, Long id);
	
	void updatePaymentStatus(Long bookingId, BookingStatus status);
	List<SeatAvailabilityDTO> bookSeatsWithPessimistic(List<Long> seatIds, Long userId);
	public void markSeatsAsBooked(Long bookingId);
	public void releaseSeats(Long bookingId);
	//public Booking getBookingById(Long bookingId);


}
