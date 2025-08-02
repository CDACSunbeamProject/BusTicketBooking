package com.project.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Bus;

public interface BusDao extends JpaRepository<Bus, Long> {
	boolean existsByBusName(String busName);

	Optional<Bus> findByBusNo(String busNo);

}
