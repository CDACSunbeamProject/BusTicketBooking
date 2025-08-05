package com.project.dto;

import com.project.entities.BookingStatus;
import com.project.entities.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingRespDTO {
	// Booking Info
	private Long BookingId;
	private String bookingTime;
	private BookingStatus bookingStatus;
	private double totalAmount;
	private PaymentStatus paymentStatus;
	private BusRespDTO bus; 
}
