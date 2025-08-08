package com.project.dto;

import java.time.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddBusDTO {
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
    
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate departureDate;
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime departureTime;
    
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate arrivalDate;
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime arrivalTime; 
    private double duration;  // in hours or minutes  
    private Float rating; 
    private List<String> amenities;
}
