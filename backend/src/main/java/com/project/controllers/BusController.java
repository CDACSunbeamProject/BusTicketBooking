package com.project.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.project.daos.BusDao;
import com.project.dto.AddBusDTO;
import com.project.dto.BusRespDTO;
import com.project.dto.SeatAvailabilityDTO;
import com.project.dto.SeatSelectionRequestDTO;
import com.project.entities.Bus;
import com.project.entities.Route;
import com.project.services.BusService;
import com.project.services.RouteService;
import com.project.services.SeatService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/buses")
@CrossOrigin(origins = "http://localhost:3001")
@AllArgsConstructor
@Validated
public class BusController {

    private final BusDao busDao;
	
	private final BusService busService;
	private final RouteService routeService;

	/*
	 * Request handling method (REST API end point) 
	 * - desc - Add new restaurant 
	 * URL -http://host:port/buses 
	 * Method - POST 
	 * Payload -JSON representation of restaurant 
	 * Resp - in case failure (dup bus name) - ApiResp DTO
	 *  - containing err mesg + SC 400(BAD_REQUEST)
	 *  success - SC 201 + ApiResp - success mesg
	 */
	
	@PostMapping("/addbus")
	@Operation(description = "Add new bus")
	public ResponseEntity<?> addNewBus(@RequestBody AddBusDTO dto){
		System.out.println("inside add bud controller");
		
		//call service method
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(busService.addNewBus(dto));
	}
	
	/*
	 * Request handling method (REST API end point) URL -
	 * http://host:port/buses/{routeId}
	 * Method - GET 
	 * Payload - none 
	 * Resp - in case of empty list - SC204 (NO_CONTENT) 
	 * o.w SC 200 + list of restaurants -> JSON []
	 */
	@GetMapping("/{routeId}")
	public  ResponseEntity<?> listBusesbyRouteAndDate(@PathVariable int routeId, 
			@RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate jDate) {
		
		return ResponseEntity.ok(busService.getAllBusesByRouteAndDate(routeId,jDate));
	}
	
	@GetMapping("/routes")
	public Route getRouteId(@RequestParam String startLocation, @RequestParam String endLocation) {
	    return routeService.getRouteByFromAndTo(startLocation, endLocation);  // You must write logic in service and repo
	}

	/*
	 * REST API end point - desc -get bus details by id 
	 * URL
	 * -http://host:port/buses/{busId} 
	 * Method - GET 
	 * Payload - none 
	 * successful Resp - SC 200 +Bus Resp dto-> JSON
	 * error resp - SC 404 + Apiresp (err mesg)
	 */
	@GetMapping("/getbus/{busId}")
	public ResponseEntity<?> getBusDetails(
			@PathVariable int busId) {
		
		return ResponseEntity.ok(busService.getBusDetails(busId));
		
		}
	
	@PostMapping("/seatselection")
	public ResponseEntity<?> getBusSeatLayout(@RequestBody SeatSelectionRequestDTO dto) {
		System.out.println("inside bus controller");
	    return ResponseEntity.ok().body(busService.fetchBusDetailsByName(dto.getBusName()));
	}
	
	private final SeatService seatAvail;
	
	@GetMapping("/{busId}/seats")
	public ResponseEntity<?> getSeatAvailability(
            @PathVariable int busId) {

        List<SeatAvailabilityDTO> seatList = seatAvail.getSeatAvailability(busId);
        return ResponseEntity.ok(seatList);
    }
	
	@GetMapping("/getall")
	public ResponseEntity<?> getAllBuses(){
		System.out.println("inside get all buses");
		return ResponseEntity.ok(busService.getAllBuses());
	}
	
	@GetMapping("/getroutes")
	public ResponseEntity<?> getAllPossibleRoutes(){
		System.out.println("inside get all buses");
		return ResponseEntity.ok(busService.getAllRoutes());
	}
	
}


	





















