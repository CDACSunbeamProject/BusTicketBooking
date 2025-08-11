package com.project.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MyBookingRespDTO {
	private Long bookingId;
    private LocalDateTime bookingTime;
    private String bookingStatus;
    private double totalFare;
    private String busNo;
    private String busName;
    private String departureDate;
    private String departureTime;
    private Long ticketId;
    private String ticketStatus;
    private int passengerCount;
    private String source;
    private String destination;
}
