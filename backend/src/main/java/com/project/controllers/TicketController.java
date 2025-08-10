package com.project.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.TicketRequestDTO;
import com.project.services.TicketService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "http://localhost:3001")
@AllArgsConstructor
public class TicketController {
	private final TicketService ticketService;

	@PostMapping("/generate")
	public ResponseEntity<?> generateTicket(@RequestBody TicketRequestDTO dto) {
		System.out.println("inside controller");
		if (dto.getBookingId() == null) {
			return ResponseEntity.badRequest().body("Missing bookingId");
		}
		return ResponseEntity.ok(ticketService.generateTicket(dto.getBookingId()));
		
	}

	@PostMapping("/ticket")
	public ResponseEntity<?> getTicket(@RequestBody Long ticketId) {
		if (ticketId == null) {
			return ResponseEntity.badRequest().body("Missing bookingId");
		}
		return ResponseEntity.ok().body(ticketService.getTicket(ticketId));
	}
}
