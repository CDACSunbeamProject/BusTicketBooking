package com.project.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.daos.UserDao;
import com.project.dto.SummaryRespDTO;
import com.project.dto.UserRespDTO;
import com.project.services.BusService;
import com.project.services.RouteService;
import com.project.services.TicketService;
import com.project.services.UserService;

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
//	private UserDao userDao;
	
//	@DeleteMapping("/delete/{id}")
//	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
//	    userDao.deleteById(id);
//	    return ResponseEntity.ok("Deleted");
//	}
	@GetMapping("/users")
	public ResponseEntity<?> getAllRegisteredUsers() {
		System.out.println("inside controller");
		List<UserRespDTO> users = userService.getAllUsers();
	    return ResponseEntity.ok(users);
	}
	@GetMapping("/summary")
	public ResponseEntity<?> getDashboardSummary() {
		System.out.println("inside controller");
		SummaryRespDTO dto=new SummaryRespDTO();
		dto.setTotalUsers(userService.getAllUsers().size());
		dto.setTotalBookings(userService.getAllBookings());
		dto.setTotalAmount(userService.getTotalAmount());
		dto.setTotalBuses(busService.getAllBuses().size());
		return ResponseEntity.ok().body(dto);
	}

}
