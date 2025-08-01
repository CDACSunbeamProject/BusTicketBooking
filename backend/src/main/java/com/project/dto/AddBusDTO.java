package com.project.dto;

import java.time.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddBusDTO {
	private Long routeId;
    private String busName;
    private String busNo;
    private String busType;
    private String operatorName;   
    private int noOfSeats;  
    
    private String startLocation;
    private String endLocation;
    
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate departure_date;
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime departure_time;
    
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate arrival_date;
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime arrival_time; 
    private double duration;  // in hours or minutes  
    private double price; 
    private Float rating; 
    private List<String> amenities;
}
