package com.project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.BookingRespDTO;
import com.project.dto.SeatAvailabilityDTO;
import com.project.services.BookingService;
import com.project.services.BookingServiceImpl;
import com.project.services.BusService;
import com.project.services.SeatService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:3001")
@AllArgsConstructor
@Validated
public class BookingController {
	
    private final BookingService bookService;

    /*@PostMapping("/lock/{seatId}/user/{userId}")
    public SeatAvailabilityDTO lockSeat(@PathVariable Long seatId, @PathVariable Long userId) {
        return bookService.lockSeat(seatId, userId);
    }*/
    
    @PostMapping("/lock-multiple/user/{userId}")
    public ResponseEntity<?> lockMultipleSeats(@RequestBody List<Long> seatIds, @PathVariable Long userId) {
    	try {
            List<SeatAvailabilityDTO> lockedSeats = bookService.bookSeatsWithPessimistic(seatIds, userId);
            return ResponseEntity.ok(lockedSeats);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
        }
    	
    }


    /*@PostMapping("/confirm/{seatId}/user/{userId}")
    public SeatAvailabilityDTO confirmSeat(@PathVariable Long seatId, @PathVariable Long userId) {
        return bookService.confirmBooking(seatId, userId);
    }*/
    
    @GetMapping("/bookings")
    public ResponseEntity<List<BookingRespDTO>> getAllBookings() {
        List<BookingRespDTO> bookings = bookService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingRespDTO>> getBookingsByUser(@PathVariable Long userId) {
    	System.out.println("Hello user");
        List<BookingRespDTO> userBookings = bookService.getBookingsByUserId(userId);
        
        return ResponseEntity.ok(userBookings);
    }

}
