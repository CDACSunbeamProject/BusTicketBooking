package com.project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.SeatAvailabilityDTO;
import com.project.services.BookingService;
import com.project.services.BusService;
import com.project.services.SeatService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/booking")
@AllArgsConstructor
@Validated
public class BookingController {
	
    private final BookingService bookService;

    @PostMapping("/lock/{seatId}/user/{userId}")
    public SeatAvailabilityDTO lockSeat(@PathVariable Long seatId, @PathVariable Long userId) {
        return bookService.lockSeat(seatId, userId);
    }

    @PostMapping("/confirm/{seatId}/user/{userId}")
    public SeatAvailabilityDTO confirmSeat(@PathVariable Long seatId, @PathVariable Long userId) {
        return bookService.confirmBooking(seatId, userId);
    }
}
