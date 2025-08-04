package com.project.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Booking;

public interface BookingDao extends JpaRepository<Booking, Long>{
	Optional<Booking> findById(Long id);
}
