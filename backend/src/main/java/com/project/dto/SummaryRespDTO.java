package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SummaryRespDTO {
	private long totalUsers;
	private long totalBookings;
	private long totalAmount;
	private long totalBuses;
}
