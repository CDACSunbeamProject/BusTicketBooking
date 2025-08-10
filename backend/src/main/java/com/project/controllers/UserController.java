package com.project.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.project.dto.AuthRequest;
import com.project.dto.AuthResp;
import com.project.dto.BookingRespDTO;
import com.project.dto.TicketRequestDTO;
import com.project.dto.UserProfileDTO;
import com.project.dto.UserRequestDTO;
import com.project.dto.UserRespDTO;
import com.project.entities.User;
import com.project.security.JwtUtils;
import com.project.services.BusService;
import com.project.services.TicketService;
import com.project.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3001")
@AllArgsConstructor
public class UserController {

	// depcy
	private final UserService userService;// still needed for signup
	private AuthenticationManager authenticationManager;
	private JwtUtils jwtUtils;
	private final TicketService ticketService;
	private final BusService busService;

	/*
	 * User sign up URL - http://host:port/users/signup Method - POST Payload -
	 * UserReqDTO (user details) error resp - ApiResp dto - SC 400 , mesg - reg
	 * failed success resp - UseResp dto - with details
	 */
	@PostMapping("/signup")
	public ResponseEntity<?> userSignUp(@RequestBody @Valid UserRequestDTO dto) {
		System.out.println("in user signup " + dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.signUp(dto));
	}

	/*
	 * User sign in URL - http://host:port/users/signin Method - POST Payload - Auth
	 * Request DTO (email ,pwd) error resp - ApiResp dto - SC 401 , mesg - login
	 * failed success resp - Auth Resp dto -mesg , JWT
	 */
	@PostMapping("/signin")
	public ResponseEntity<?> userSignIn(@RequestBody AuthRequest dto) {
		System.out.print("inside login");
		// 1. Create Authentication Token
		// (UsernamePasswordAuthToken - principal , crendential)
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(dto.getEmail(),
				dto.getPassword());
		System.out.println("before - " + authentication.isAuthenticated());// false);
		// 2. Invoke authenticate method of AuthenticationManager
		Authentication validAuthentication = authenticationManager.authenticate(authentication);
//			System.out.println(validAuthentication.getPrincipal().getClass());
		User user = (User) validAuthentication.getPrincipal();
		System.out.println(user);// UserEntity
//			System.out.println("after "+validAuthentication.isAuthenticated());//tru
		// 3. In case of success , generate JWT n send it to REST client
		return ResponseEntity.ok(new AuthResp(user.getId(),"auth successful", jwtUtils.generateJwtToken(validAuthentication), user.getEmail(), user.getRole().name()));
	}
//
//	@PostMapping("/ticket")
//	@Operation(description = "Ticket is Generated")
//	public ResponseEntity<?> generateTicket(@RequestBody TicketRequestDTO dto) {
//		// call service method
//		return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.generateTicketAfterPayment(dto));
//	}

	@GetMapping("/profile")
	public ResponseEntity<?> getProfile(Authentication authentication) {
		String email = (String) authentication.getPrincipal(); // you stored email in JWT
		UserProfileDTO user = userService.getUserProfileDetails(email); // fetch User from DB
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}

		return ResponseEntity.ok().body(user);
	}
	@PutMapping("profile/update")
	public ResponseEntity<?> updateUserProfile(@RequestBody UserProfileDTO dto){
		System.out.println("insisde controller");
		return ResponseEntity.ok(userService.updateProfile(dto));
	}

	@GetMapping("/bookings")
	public ResponseEntity<?> getMyBooking(Authentication authentication) {
		String email = (String) authentication.getPrincipal(); // you stored email in JWT
		List<BookingRespDTO> bookings = userService.getMyBookings(email); // fetch User from DB
		return ResponseEntity.ok().body(bookings);
	}
}
