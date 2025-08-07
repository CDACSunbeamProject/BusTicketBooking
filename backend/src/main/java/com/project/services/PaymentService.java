package com.project.services;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

public interface PaymentService {

	String createOrder(int amount, String currency, String receiptId) throws RazorpayException;
	
}
