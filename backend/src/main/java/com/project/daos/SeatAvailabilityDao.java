package com.project.daos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.entities.Bus;
import com.project.entities.Seat;

import jakarta.persistence.LockModeType;

public interface SeatAvailabilityDao extends JpaRepository<Seat, Long>{
	List<Seat> findByBusId(int busId);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT s FROM Seat s WHERE s.id = :seatId")
	Optional<Seat> findByIdAndLock(@Param("seatId") Long seatId);

	List<Seat> findAllByStatusAndLockTimeBefore(String status, LocalDateTime time);

}
