package com.project.dto;

import java.util.List;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class BookingRequestDTO {
	private Long busId;
    private List<Long> selectedSeats;
    private List<PassengerDTO> passengerDetails;
    private Integer totalAmount;  // amount in paise (for Razorpay)
    private Long userId;
}
