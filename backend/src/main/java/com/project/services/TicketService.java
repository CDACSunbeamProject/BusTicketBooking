package com.project.services;

import com.project.dto.TicketRespDTO;

public interface TicketService {
	TicketRespDTO getTicket(Long ticketId);
	Long generateTicket(Long bookingId);
}
