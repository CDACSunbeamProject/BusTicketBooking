package com.project.services;

import java.time.LocalDate;
import java.util.List;

import com.project.dto.SeatAvailabilityDTO;
import com.project.entities.Bus;

public interface SeatService {
	List<SeatAvailabilityDTO> getSeatAvailability(int busId);

	void generateSeatsForBus(Bus bus, int totalSeats);
}
