package com.project.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.project.custom_exceptions.ApiException;
import com.project.custom_exceptions.ResourceNotFoundException;
import com.project.daos.BookingDao;
import com.project.daos.BusDao;
import com.project.daos.TicketDao;
import com.project.daos.UserDao;
import com.project.dto.PassengerDTO;
import com.project.dto.TicketRequestDTO;
import com.project.dto.TicketRespDTO;
import com.project.entities.Booking;
import com.project.entities.BookingStatus;
import com.project.entities.Bus;
import com.project.entities.Passenger;
import com.project.entities.PaymentStatus;
import com.project.entities.Ticket;
import com.project.entities.TicketStatus;
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
	private final BookingDao bookingDao;
	private BookingService bookingService;
	
	
	public Long generateTicket(Long bookingId) {
        Booking booking = bookingService.getBookingById(bookingId);
        if (booking == null) {
            throw new ApiException("Booking not found with id: " + bookingId);
        }

        // Check if ticket already exists for this booking
        Ticket existingTicket = ticketDao.findByBookingId(bookingId);
        if (existingTicket.getStatus().equals(TicketStatus.CANCELLED) ) {	
            throw new ApiException("ticket is cancelled"); // Or throw exception if duplicate not allowed
        }
        if (existingTicket != null ) {	
            return existingTicket.getId(); // Or throw exception if duplicate not allowed
        }
        

        Ticket ticket = new Ticket();
        ticket.setBooking(booking);
        ticket.setBus(booking.getBus());
        ticket.setUser(booking.getUser());
        ticket.setStatus(TicketStatus.ACTIVE); // or your enum value

        // Generate unique ticket number (example: TKT + timestamp + bookingId)
        String ticketNumber = "TKT" + System.currentTimeMillis() + bookingId;
        ticket.setTicketNumber(ticketNumber);
        ticketDao.save(ticket);
        booking.setTicket(ticket);
        return ticket.getId();
    }
	
//	// Testing is pending
	@Override
	public TicketRespDTO getTicket(Long ticketId) {
		Ticket ticket = ticketDao.findById(ticketId).orElseThrow();
        System.out.println("passengers: "+ ticket.getBooking().getPassengers().size());
		return toRespDTO(ticket);
	}
	
	public static TicketRespDTO toRespDTO(Ticket ticket) {
        // Tikcet info
		TicketRespDTO dto = new TicketRespDTO();
		dto.setTicketId(ticket.getId());
		dto.setUserName(ticket.getUser().getName());
		System.out.println("userName: "+ticket.getUser().getName());
		dto.setTravelDate(ticket.getBooking().getCreationDateTime().toLocalDate());
		dto.setBookingId(ticket.getBooking().getId());
        dto.setTicketNumber(ticket.getTicketNumber());
        dto.setGeneratedAt(ticket.getCreationDateTime());
        dto.setTotalAmount(ticket.getBooking().getTotalFare());
        dto.setStatus(ticket.getStatus());
        // Bus info
        dto.setBusNumber(ticket.getBooking().getBus().getBusNo());
        dto.setBusName(ticket.getBooking().getBus().getBusName());
        dto.setOperatorName(ticket.getBooking().getBus().getOperatorName());
        dto.setDepartureDate(ticket.getBooking().getBus().getDepartureDate());
        dto.setDepartureTime(ticket.getBooking().getBus().getDepartureTime().toString());
        dto.setArrivalDate(ticket.getBooking().getBus().getArrivalDate());
        dto.setArrivalTime(ticket.getBooking().getBus().getArrivalTime().toString());
        dto.setBusType(ticket.getBooking().getBus().getBusType());
        dto.setSeatType(ticket.getBooking().getBus().getSeatType());
        dto.setRoute(ticket.getBooking().getBus().getBusRoute().getStartLocation() + " → " +
                     ticket.getBooking().getBus().getBusRoute().getEndLocation());
        // passenger info
        dto.setPassengers(
        		  ticket.getBooking().getPassengers().stream()
        		    .map(passenger -> new PassengerDTO(passenger.getName(),passenger.getAge(), passenger.getGender(), passenger.getSeatNumber()))
        		    .collect(Collectors.toList())
        		);
        
        return dto;
    }
}
