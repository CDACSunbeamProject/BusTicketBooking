package com.project.services;

import com.project.dto.SeatAvailabilityDTO;

public interface BookingService {
	public SeatAvailabilityDTO lockSeat(Long seatId, Long userId);
	public SeatAvailabilityDTO confirmBooking(Long seatId, Long userId);
	public void releaseExpiredLocks();
}
