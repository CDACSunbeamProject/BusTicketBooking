package com.project.services;

import java.util.List;

import com.project.dto.BookingRespDTO;
import com.project.dto.SeatAvailabilityDTO;

public interface BookingService {
	public SeatAvailabilityDTO lockSeat(Long seatId, Long userId);
	public SeatAvailabilityDTO confirmBooking(Long seatId, Long userId);
	public void releaseExpiredLocks();
	public List<SeatAvailabilityDTO> lockMultipleSeats(List<Long> seatIds, Long userId);
	public List<BookingRespDTO> getAllBookings();
	List<BookingRespDTO> getBookingsByUserId(Long userId);
}
