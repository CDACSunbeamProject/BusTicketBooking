package com.project.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatAvailabilityDTO {
	private String seatNumber;
    private String status; // AVAILABLE, LOCKED, BOOKED
}
