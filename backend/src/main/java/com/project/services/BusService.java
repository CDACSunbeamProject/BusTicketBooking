package com.project.services;

import java.util.List;

import com.project.dto.AddBusDTO;
import com.project.dto.ApiResponse;
import com.project.dto.BusRespDTO;

public interface BusService {
	List<BusRespDTO> getAllBuses();
	ApiResponse addNewBus(AddBusDTO transientBus);
}
