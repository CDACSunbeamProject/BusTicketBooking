package com.project.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString(callSuper = false)
public class BusRespDTO {
	private String busName;
	private String busNo;

	private String busType;
	private String operatorName;
	private int noOfSeats;
	
	/*ModelMapper, which by default doesn't map nested 
	fields (like busRoute.startLocation) into flat 
	fields (startLocation) unless explicitly configured(set in method).
	(while getting complete bus details) */
	
	private String startLocation;
	private String endLocation;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private LocalDate departureDate;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
	private LocalTime departureTime;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private LocalDate arrivalDate;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
	private LocalTime arrivalTime;

	private double duration; // in hours or minutes
	private double price;
	private Float rating;
	
	private List<String> amenities; // store JSON array like ["WiFi", "Blanket"]

	

}
