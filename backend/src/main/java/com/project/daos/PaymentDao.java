package com.project.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Payment;

public interface PaymentDao extends JpaRepository<Payment, Long> {

	com.razorpay.Payment save(com.razorpay.Payment payment);

}
