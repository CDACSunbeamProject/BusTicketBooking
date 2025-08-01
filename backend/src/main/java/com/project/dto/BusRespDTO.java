package com.project.dto;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class BusRespDTO extends BaseDTO{
	private Long routeId;
    private String busName;
    private String busNo;
    private String busType;
    private String operatorName;   
    private int noOfSeats;   
    private LocalDateTime departure;   
    private LocalDateTime arrival;  
    private double duration;  // in hours or minutes  
    private double price; 
    private Float rating; 
    private String amenities; // store JSON array like ["WiFi", "Blanket"]
    
    
	public BusRespDTO(Long routeId, String busName, String busNo, String busType, String operatorName, int noOfSeats,
			LocalDateTime departure, LocalDateTime arrival, double duration, double price, Float rating,
			String amenities) {
		super();
		this.routeId = routeId;
		this.busName = busName;
		this.busNo = busNo;
		this.busType = busType;
		this.operatorName = operatorName;
		this.noOfSeats = noOfSeats;
		this.departure = departure;
		this.arrival = arrival;
		this.duration = duration;
		this.price = price;
		this.rating = rating;
		this.amenities = amenities;
	}

}
