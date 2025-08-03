package com.project.daos;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.entities.Bus;

public interface BusDao extends JpaRepository<Bus, Long> {
	List<Bus> findByBusRouteIdAndDepartureDate(int id, LocalDate jDate);

	Optional<Bus> findByBusNo(String busNo);

	boolean existsByBusName(String busName);

	Optional<Bus> findById(int busId);
	
	@Query("select b from Bus b left join fetch b.busRoute where b.id=:busId")
	Bus fetchCompleteDetails(int busId);

}
