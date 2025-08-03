package com.project.services;

import java.util.List;

import com.project.dto.AddBusDTO;
import com.project.dto.ApiResponse;
import com.project.dto.BusRespDTO;
import com.project.dto.BusesRespDTO;
import com.project.entities.Bus;

public interface BusService {
	List<BusesRespDTO> getAllBusesByRoute(int id);
	ApiResponse addNewBus(AddBusDTO transientBus);
	BusRespDTO getBusDetails(int busId);
}
