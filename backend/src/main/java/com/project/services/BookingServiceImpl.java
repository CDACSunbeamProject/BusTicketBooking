package com.project.services;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.project.daos.SeatAvailabilityDao;
import com.project.dto.SeatAvailabilityDTO;
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

	public void releaseExpiredLocks() {
	    LocalDateTime expiryTime = LocalDateTime.now().minusMinutes(10);
	    List<Seat> lockedSeats = seatDao.findAllByStatusAndLockTimeBefore("LOCKED", expiryTime);

	    for (Seat seat : lockedSeats) {
	        seat.setStatus(SeatStatus.AVAILABLE);
	        seat.setLockedByUserId(null);
	        seat.setLockTime(null);
	    }

	    seatDao.saveAll(lockedSeats);
	}

}
