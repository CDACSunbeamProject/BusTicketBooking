package com.project.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.services.PaymentService;
import com.razorpay.RazorpayException;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@AllArgsConstructor
public class PaymentController {
	
	private final PaymentService paymentService;
	
	@PostMapping("/create-order")
	public ResponseEntity<?> createOrder(@RequestParam int amount, @RequestParam String currency, @RequestParam String receiptId) {
		
		try {
			String orderDetails = paymentService.createOrder(amount, currency, "recepient_100");
			return ResponseEntity.ok(orderDetails);
		} 
		catch (RazorpayException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
			
		}
	}
}
