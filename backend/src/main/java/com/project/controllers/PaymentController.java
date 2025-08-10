package com.project.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.BookingRequestDTO;
import com.project.dto.PaymentVerificationRequestDTO;
import com.project.entities.Booking;
import com.project.entities.BookingStatus;
import com.project.entities.Payment;
import com.project.entities.PaymentStatus;
import com.project.services.BookingService;
import com.project.services.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayException;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:3001")
@AllArgsConstructor
public class PaymentController {
	
	private final PaymentService paymentService;
	private final BookingService bookingService;
	
	/*@PostMapping("/create-order")
	public ResponseEntity<?> createOrder(@RequestParam double amount, @RequestParam String currency, @RequestParam Long userId) {
		try {
			// 1. Save booking with paymentStatus = "Pending"
            Booking booking = bookingService.createBooking(bookingRequest);
			String orderDetails = paymentService.createOrder(amount, currency, userId);
			return ResponseEntity.ok(orderDetails);
		} 
		catch (RazorpayException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
			
		}
	}*/
	
	@PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody BookingRequestDTO bookingRequest) {
        try {
            // 1. Save booking with paymentStatus = "Pending"
            Booking booking = bookingService.createBooking(bookingRequest);

            // 2. Create Razorpay order for bookingRequest.totalAmount
            Order razorpayOrder = bookingService.createRazorpayOrder(booking.getTotalFare(), booking.getId());

            // 3. Return Razorpay order details + bookingId to frontend
            Map<String, Object> response = new HashMap<>();
            //response.put("order", razorpayOrder);
            response.put("order_id", razorpayOrder.get("id"));
            response.put("bookingId", booking.getId());
            response.put("totalfare", booking.getTotalFare()*100);
            response.put("currency", razorpayOrder.get("currency"));
            response.put("receipt", razorpayOrder.get("receipt"));
            response.put("status", razorpayOrder.get("status"));
            
            
            response.put("bookingId", booking.getId());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating order");
        }
    }
	
	@PostMapping("/verify")
	public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerificationRequestDTO request) {
		
	    try {
	        // ✅ Step 1: Generate signature using your Razorpay secret
	        String generatedSignature = hmacSha256(
	            request.getRazorpay_order_id() + "|" + request.getRazorpay_payment_id(),
	            "uEfkAVFln6GICoQ84azDB01x" // <-- your secret key here
	        );

	        // ✅ Step 2: Match signature from Razorpay
	        if (!generatedSignature.equals(request.getRazorpay_signature())) {
	            bookingService.updatePaymentStatus(request.getBookingId(), BookingStatus.CANCELLED);
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
	        }

	        // ✅ Step 3: (Optional) Check Razorpay payment status
	        com.razorpay.Payment payment = paymentService.getPaymentDetails(request.getRazorpay_payment_id());
	        if ("captured".equalsIgnoreCase(payment.get("status"))) {
	            bookingService.updatePaymentStatus(request.getBookingId(), BookingStatus.CONFIRMED);
	         // ✅ Update seat status to BOOKED
	            bookingService.markSeatsAsBooked(request.getBookingId());
	            
	         // Save payment details
	         // Fetch payment details from Razorpay using the payment ID from the request
	            com.razorpay.Payment rpPayment = paymentService.getPaymentDetails(request.getRazorpay_payment_id());
	            
	            Payment paymentRecord = new Payment();
	            //paymentRecord.setTransactionId(request.getRazorpay_payment_id());
	            paymentRecord.setOrderId(request.getRazorpay_order_id());
	            paymentRecord.setPaymentGatewayId(request.getRazorpay_payment_id());
	            paymentRecord.setSignature(request.getRazorpay_signature());
	            
	         // Amount is in paise from Razorpay, convert to INR
	            paymentRecord.setAmountPaid(Double.parseDouble(rpPayment.get("amount").toString()) / 100);
	            paymentRecord.setCurrency(rpPayment.get("currency").toString());
	            
	         // Status mapping
	            if ("captured".equalsIgnoreCase(rpPayment.get("status"))) {
	                paymentRecord.setStatus(PaymentStatus.SUCCESS);
	            } else if ("failed".equalsIgnoreCase(rpPayment.get("status"))) {
	                paymentRecord.setStatus(PaymentStatus.FAILED);
	            } else {
	                paymentRecord.setStatus(PaymentStatus.PENDING);
	            }
	            // Payment mode
	            paymentRecord.setPaymentMode(payment.has("method") ? payment.get("method").toString() : null);
	            // Link booking
	            paymentRecord.setBooking(bookingService.getBookingById(request.getBookingId()));
	            // Store raw JSON for debugging/audits
	            //paymentRecord.setRawResponse(rpPayment.toString());

	            // Error info (if any)
	            if (rpPayment.has("error_code")) {
	                paymentRecord.setErrorCode(rpPayment.get("error_code").toString());
	            }
	            if (rpPayment.has("error_description")) {
	                paymentRecord.setErrorDescription(rpPayment.get("error_description").toString());
	            }
	            paymentService.savePayment(paymentRecord);
	            
	            return ResponseEntity.ok("Payment verified and confirmed");
	        } else {
	            bookingService.updatePaymentStatus(request.getBookingId(), BookingStatus.CANCELLED);
	            bookingService.releaseSeats(request.getBookingId());
	            
	            
	            
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment not captured");
	        }

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Verification error");
	    }
	}


	private String hmacSha256(String data, String key) throws Exception {
		Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
		SecretKeySpec secret_key = new SecretKeySpec(key.getBytes(), "HmacSHA256");
		sha256_HMAC.init(secret_key);
		return new String(Hex.encodeHex(sha256_HMAC.doFinal(data.getBytes())));
	}
}


























