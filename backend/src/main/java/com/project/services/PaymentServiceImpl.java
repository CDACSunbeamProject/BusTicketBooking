package com.project.services;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.project.daos.PaymentDao;
import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {
	
	private final RazorpayClient razorpayClient;
	private final PaymentDao paymentDao;
	
	public Order createOrder(double amount, String currency, Long receiptId) throws RazorpayException {
		//1. Save booking in DB with PENDING status
		//2. Call your PaymentServiceImpl.createOrder()

		//3. Return { order, bookingId } to frontend
		
		//RazorpayClient razorpayClient = new RazorpayClient(apiKey,apiSecret);
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", amount*100);		// Razorpay expects amount in paisa
		orderRequest.put("currency", currency);
		orderRequest.put("receipt", receiptId);
		orderRequest.put("payment_capture", true); // Optional, but usually required
		
		//creates the Razorpay order
		Order order = razorpayClient.orders.create(orderRequest);
		return order;
	}

	@Override
	public Payment getPaymentDetails(String razorpay_payment_id) throws RazorpayException {
		return razorpayClient.payments.fetch(razorpay_payment_id);
	}

	/*public Payment savePayment(Payment payment) {
        return paymentDao.save(payment);
    }*/

	@Override
	public void savePayment(com.project.entities.Payment paymentRecord) {
		paymentDao.save(paymentRecord);
		
	}
}











