package com.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentVerificationRequestDTO {
	private String razorpay_order_id;
    private String razorpay_payment_id;
    private String razorpay_signature;
    private Long bookingId;

}
