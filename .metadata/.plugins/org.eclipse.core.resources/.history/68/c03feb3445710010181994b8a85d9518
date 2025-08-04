package com.project.services;

import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.project.custom_exceptions.ApiException;
import com.project.daos.BusDao;
import com.project.daos.TicketDao;
import com.project.daos.UserDao;
import com.project.dto.TicketRequestDTO;
import com.project.dto.TicketRespDTO;
import com.project.entities.Bus;
import com.project.entities.Passenger;
import com.project.entities.Ticket;
import com.project.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class TicketServiceImpl implements TicketService {

	private final TicketDao ticketDao;
	private final BusDao busDao;
	private final UserDao userDao;
	private final ModelMapper modelMapper;

	@Override
	public Long bookTicket(TicketRequestDTO dto) {
		User user = userDao.findById(dto.getUserId())
				.orElseThrow(() -> new ApiException("User not found with id: " + dto.getUserId()));
		System.out.println("User ID: " + dto.getUserId());

		Bus bus = busDao.findByBusNo(dto.getBusNo())
				.orElseThrow(() -> new ApiException("Bus not found with number: " + dto.getBusNo()));
		System.out.println("Bus No: " + dto.getBusNo());

		Ticket ticket = new Ticket();
		ticket.setBus(bus);
		ticket.setUser(user);
		ticket.setTravelDate(dto.getTravelDate());
		ticket.setTotalPrice(dto.getTotalAmount());
		ticket.setEmail(dto.getEmail());
		ticket.setPhone(dto.getPhone());

		/*ticket.setPassengers(dto.getPassengers().stream().map(p -> {
			if (bus.getBookedSeats().contains(p.getSeatNo()))
				throw new ApiException("seatNo: " + p.getSeatNo() + " is Already booked for busNo:" + bus.getBusNo());
			Passenger passenger = new Passenger();
			passenger.setName(p.getName());
			passenger.setAge(p.getAge());
			passenger.setGender(p.getGender());
			passenger.setSeatNo(p.getSeatNo());
			passenger.setTicket(ticket);
			return passenger;
		}).collect(Collectors.toList()));*/
		System.out.println("successfully passangers added for ticket");

		Ticket persistentTicket = ticketDao.save(ticket);
		System.out.println("Successfullly Ticket is Generated");
		return persistentTicket.getId();
	}
	
//	// Testing is pending
//	@Override
//	public TicketRespDTO getTicket(Long ticketId) {
//		if (!ticketDao.existsById(ticketId))
//			throw new ApiException("Ticket not with id " + ticketId);
//
//		Optional<Ticket> ticket = ticketDao.findById(ticketId);
//		TicketRespDTO persistentTicket = modelMapper.map(ticket, TicketRespDTO.class);
//		return persistentTicket;
//	}
}
