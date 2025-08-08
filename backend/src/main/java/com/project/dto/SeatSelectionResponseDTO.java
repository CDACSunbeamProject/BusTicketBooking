package com.project.dto;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;

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

	private String busName;
    private String busNo;
    private String busType;
    private String operatorName; 
    private String acType;
    private String seatType;
    private double price;
    private int noOfSeats; 
    private String startLocation;
    private String endLocation;
    private String departureDate;
    private String departureTime;
    private String arrivalDate;
    private String arrivalTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "#.##")
    private Float rating;
    private double duration;
    private Set<String> bookedSeats;
}
