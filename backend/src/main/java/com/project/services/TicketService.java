package com.project.services;

import com.project.dto.TicketRequestDTO;
import com.project.dto.TicketRespDTO;

public interface TicketService {
	TicketRespDTO getTicket(String ticketNumber);
	TicketRespDTO generateTicketAfterPayment(TicketRequestDTO dto);
}
