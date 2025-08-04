package com.project.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.custom_exceptions.ApiException;
import com.project.custom_exceptions.ResourceNotFoundException;
import com.project.daos.BusDao;
import com.project.daos.RouteDao;
import com.project.dto.AddBusDTO;
import com.project.dto.ApiResponse;
import com.project.dto.BusRespDTO;
import com.project.dto.BusesRespDTO;
import com.project.entities.Bus;
import com.project.entities.Route;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BusServiceImpl implements BusService {
	private final BusDao busDao;
	private final RouteDao routeDao;
	private final ModelMapper modelMapper;
	
	@Override
	public ApiResponse addNewBus(AddBusDTO transientBus) {
		//print
		System.out.println("date: "+transientBus.getDepartureDate());
		
		//check for same bus name
		if(busDao.existsByBusName(transientBus.getBusName()))
			throw new ApiException("duplicate bus name!!");
		
		//find the existing route in the database
		Optional<Route> optionalRoute = routeDao.findByStartLocationAndEndLocation(
				transientBus.getStartLocation(), transientBus.getEndLocation()
		);
		
		//Declare a Route variable
		Route route;
	    if (optionalRoute.isPresent()) {
	    	//if Route already exists in DB, use that
	        route = optionalRoute.get();
	    } else {
	    	//create new route
	        Route newRoute = new Route();
	        newRoute.setStartLocation(transientBus.getStartLocation());
	        newRoute.setEndLocation(transientBus.getEndLocation());
	        route = routeDao.save(newRoute);
	    }
		
		//map dto -> entity
		Bus entity = modelMapper.map(transientBus, Bus.class);
		entity.setBusRoute(route);
		
		//Manually convert amenities list to JSON string
	    try {
	        ObjectMapper mapper = new ObjectMapper();
	        entity.setAmenities(mapper.writeValueAsString(transientBus.getAmenities()));
	    } catch (Exception e) {
	        throw new RuntimeException("Invalid amenities list format");
	    }
	    
		//save
		Bus persistentBus = busDao.save(entity);
		return new ApiResponse("new bus added with id= "+persistentBus.getId());
	}

	@Override
	public List<BusesRespDTO> getAllBusesByRouteAndDate(int Routeid, LocalDate jDate) {
		return busDao.findByBusRouteIdAndDepartureDate(Routeid,jDate)
				.stream()
				.map(bus -> 
				modelMapper.map(bus,  BusesRespDTO.class))
				.toList();
				
				
	}

	@Override
	public BusRespDTO getBusDetails(int busId) {
		// invoke dao's method
		Bus entity = busDao.fetchCompleteDetails(busId);
		
		BusRespDTO dto = modelMapper.map(entity, BusRespDTO.class);
		
		if(entity.getBusRoute() != null) {
			dto.setStartLocation(entity.getBusRoute().getStartLocation());
			dto.setEndLocation(entity.getBusRoute().getEndLocation());
		}

		try {
			dto.setAmenities(entity.getAmenitiesList());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return dto;
	}

}















