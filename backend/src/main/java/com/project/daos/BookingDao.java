package com.project.daos;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.entities.Booking;
import com.project.entities.Seat;

public interface BookingDao extends JpaRepository<Booking, Long>{
	Optional<Booking> findById(Long id);
	
}
