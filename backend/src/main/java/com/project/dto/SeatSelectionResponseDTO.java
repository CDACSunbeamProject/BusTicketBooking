package com.project.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SeatSelectionResponseDTO {

	private Long Id;
    private String busName;
    private String busNumber;
    private String operatorName;
    private String busType;
    private String seatType;
    private String departureDate;
    private String departureTime;
    private String arrivalDate;
    private String arrivalTime;
    private String source;
    private String destination;
    private double fare;
    private int totalSeats;
    private Set<String> bookedSeats;
}
