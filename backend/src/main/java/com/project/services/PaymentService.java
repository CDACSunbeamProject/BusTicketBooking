package com.project.services;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

public interface PaymentService {

	Order createOrder(double amount, String currency, Long userId) throws RazorpayException;

	Payment getPaymentDetails(String razorpay_payment_id) throws RazorpayException;

	void savePayment(com.project.entities.Payment paymentRecord);
	
}
