package com.project.dto;

import java.time.LocalTime;
import java.util.List;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = false)
public class BusesRespDTO {
    private String busName;

    private String busType;
    private String operatorName;   
    private int noOfSeats;  
  
	private LocalTime arrival_time;  
    private LocalTime departure_time;
    
    private double price; 
    private Float rating;
    private List<String> bookedSeats;
  
    public BusesRespDTO(String busName, String busType, String operatorName, int noOfSeats, LocalTime arrival_time,
 			LocalTime departure_time, double price, Float rating, List<String> bookedSeats) {
 		
 		this.busName = busName;
 		this.busType = busType;
 		this.operatorName = operatorName;
 		this.noOfSeats = noOfSeats;
 		this.arrival_time = arrival_time;
 		this.departure_time = departure_time;
 		this.price = price;
 		this.rating = rating;
 		this.bookedSeats = bookedSeats;
 	}
}
