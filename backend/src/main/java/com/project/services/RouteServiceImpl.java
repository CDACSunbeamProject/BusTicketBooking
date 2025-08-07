package com.project.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.project.custom_exceptions.ResourceNotFoundException;
import com.project.daos.BusDao;
import com.project.daos.RouteDao;
import com.project.daos.SeatAvailabilityDao;
import com.project.entities.Route;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class RouteServiceImpl implements RouteService {

	private RouteDao routeDao;
	
	@Override
	public Route getRouteByFromAndTo(String from, String to) {
		return routeDao.findByStartLocationAndEndLocation(from, to)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found for: " + from + " to " + to));
	}

}
