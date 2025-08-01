package com.project.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Route;

public interface RouteDao extends JpaRepository<Route, Long>{
	Optional<Route> findByStartLocationAndEndLocation(String startLocation,String endLocation);
}
