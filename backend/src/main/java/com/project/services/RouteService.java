package com.project.services;

import com.project.entities.Route;

public interface RouteService {
	Route getRouteByFromAndTo(String from, String to);
}
