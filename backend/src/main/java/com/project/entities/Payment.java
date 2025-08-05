package com.project.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment extends BaseEntity{
	
	private String transactionId;
	private String paymentGatewayId; // e.g., Razorpay Payment ID
    private double amountPaid;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status; // SUCCESS, FAILED, PENDING

    private String paymentMode; // e.g., UPI, CARD, NETBANKING

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
}
