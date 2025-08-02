package com.project.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Ticket;
public interface TicketDao extends JpaRepository<Ticket, Long>{
	Optional<Ticket> findById(Long id);
	boolean existsById(Long id);
}
