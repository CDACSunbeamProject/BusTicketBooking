package com.project.controllers;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.custom_exceptions.ApiException;
import com.project.daos.UserDao;
import com.project.dto.AddBusDTO;
import com.project.dto.ApiResponse;
import com.project.dto.BookingRespDTO;
import com.project.dto.BusRespDTO;
import com.project.dto.SeatAvailabilityDTO;
import com.project.dto.SeatSelectionRequestDTO;
import com.project.dto.UserIdRequestDTO;
import com.project.dto.UserProfileRespDTO;
import com.project.dto.UserRespDTO;
import com.project.entities.Bus;
import com.project.entities.Route;
import com.project.services.BusService;
import com.project.services.RouteService;
import com.project.services.SeatService;
import com.project.services.TicketService;
import com.project.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3001")
@AllArgsConstructor
@Validated
public class AdminController {

	private final BusService busService;
	private final RouteService routeService;
	private final UserService userService;
	private final TicketService ticketService;
	private UserDao userDao;
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
	    userDao.deleteById(id);
	    return ResponseEntity.ok("Deleted");
	}
	@GetMapping("/users")
	public ResponseEntity<List<UserRespDTO>> getAllUsers() {
	    List<UserRespDTO> users = userService.getAllUsers();
	    return ResponseEntity.ok(users);
	}

}
