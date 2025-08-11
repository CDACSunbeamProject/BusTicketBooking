package com.project.services;

import java.time.LocalDate;
import java.util.List;

import com.project.dto.AddBusDTO;
import com.project.dto.ApiResponse;
import com.project.dto.BusRespDTO;
import com.project.dto.BusesRespDTO;
import com.project.dto.RouteDTO;
import com.project.dto.SeatSelectionResponseDTO;
import com.project.entities.Bus;

public interface BusService {
	List<BusRespDTO> getAllBusesByRouteAndDate(int id,LocalDate jDate);
	ApiResponse addNewBus(AddBusDTO transientBus);
	BusRespDTO getBusDetails(int busId);
	SeatSelectionResponseDTO fetchBusDetailsByName(String busName);
	List<BusRespDTO> getAllBuses();
	List<RouteDTO> getAllRoutes();
}
