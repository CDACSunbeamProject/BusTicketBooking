package com.project.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Ticket;
import java.util.List;

public interface TicketDao extends JpaRepository<Ticket, Long>{
	Optional<Ticket> findById(Long id);
	boolean existsById(Long ticketId);
	boolean existsByTicketNumber(String ticketNumber);
	Optional<Ticket> findByTicketNumber(String ticketNumber);
	Ticket findByBookingId(Long bookingId);
}
