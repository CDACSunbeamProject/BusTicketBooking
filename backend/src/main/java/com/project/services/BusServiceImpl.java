package com.project.services;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.Collections;
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
import com.project.daos.SeatAvailabilityDao;
import com.project.dto.AddBusDTO;
import com.project.dto.ApiResponse;
import com.project.dto.BusRespDTO;
import com.project.dto.BusesRespDTO;
import com.project.dto.RouteDTO;
import com.project.dto.SeatSelectionResponseDTO;
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
	private final SeatAvailabilityDao seatDao;
	private final ModelMapper modelMapper;
	
	public final SeatService seatService;
	
	@Override
	public ApiResponse addNewBus(AddBusDTO transientBus) {
		//print
		System.out.println("date: "+transientBus.getDepartureDate());
		
		//check for same bus name
		if(busDao.existsByBusName(transientBus.getBusName()))
			throw new ApiException("duplicate bus name!!");
		if(busDao.existsByBusNo(transientBus.getBusNo()))
			throw new ApiException("duplicate bus number");
		
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
		
		// Generate seats for this bus
	    seatService.generateSeatsForBus(persistentBus, transientBus.getNoOfSeats());
	    
		return new ApiResponse("new bus added with id= "+persistentBus.getId());
	}

	@Override
	public List<BusRespDTO> getAllBusesByRouteAndDate(int Routeid, LocalDate jDate) {
		return busDao.findByBusRouteIdAndDepartureDate(Routeid, jDate).stream().map(entity -> {
	        BusRespDTO dto = modelMapper.map(entity, BusRespDTO.class);
	        // Add route info if available
	        if (entity.getBusRoute() != null) {
	            dto.setStartLocation(entity.getBusRoute().getStartLocation());
	            dto.setEndLocation(entity.getBusRoute().getEndLocation());
	        }
	        // Add amenities if available
	        try {
	            dto.setAmenities(entity.getAmenitiesList());
	        } catch (Exception e) {
	            e.printStackTrace(); // Or use proper logging
	        }

	        return dto;
	    }).toList();
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

	
	@Override
	public SeatSelectionResponseDTO fetchBusDetailsByName(String busName) {
		System.out.println("inside service layer ...");
		List<Bus> buses=busDao.findByBusName(busName);
		if(buses.isEmpty()) throw new ResourceNotFoundException("Bus is Not found with id:" + busName);
		Bus bus=buses.getFirst();
		System.out.println("bus is found with id: " + bus.getId());
		
		SeatSelectionResponseDTO respDto=new SeatSelectionResponseDTO();
		respDto.setBusName(bus.getBusName());
		respDto.setBusNo(bus.getBusNo());
		respDto.setOperatorName(bus.getOperatorName());
		respDto.setBusType(bus.getBusType());
		respDto.setSeatType(bus.getSeatType());
		respDto.setAcType(bus.getAcType());
		respDto.setDepartureDate(bus.getDepartureDate()!=null ? bus.getDepartureDate().toString(): "");
		respDto.setDepartureTime(bus.getDepartureTime()!=null ? bus.getDepartureTime().toString(): "");
		respDto.setArrivalDate(bus.getArrivalDate()!=null ? bus.getArrivalDate().toString(): "");
		respDto.setArrivalTime(bus.getArrivalTime()!=null ? bus.getArrivalTime().toString(): "");
		respDto.setStartLocation(bus.getBusRoute().getStartLocation());
		respDto.setEndLocation(bus.getBusRoute().getEndLocation());
		respDto.setPrice(bus.getPrice());
		respDto.setDuration(bus.getDuration());
		respDto.setNoOfSeats(bus.getNoOfSeats());
		respDto.setRating(bus.getRating());
		respDto.setBookedSeats(bus.getBookedSeats());
		return respDto;
	}

	@Override
	public List<BusRespDTO> getAllBuses() {
	    return busDao.findAll().stream().map(entity -> {
	        BusRespDTO dto = modelMapper.map(entity, BusRespDTO.class);
	        // Add route info if available
	        if (entity.getBusRoute() != null) {
	            dto.setStartLocation(entity.getBusRoute().getStartLocation());
	            dto.setEndLocation(entity.getBusRoute().getEndLocation());
	        }
	        // Add amenities if available
	        try {
	            dto.setAmenities(entity.getAmenitiesList());
	        } catch (Exception e) {
	            e.printStackTrace(); // Or use proper logging
	        }

	        return dto;
	    }).toList();
	}

	@Override
	public List<RouteDTO> getAllRoutes() {
		return routeDao.findAll().stream().map(route ->{
			return modelMapper.map(route, RouteDTO.class);
		}).toList();
	}

	
}















