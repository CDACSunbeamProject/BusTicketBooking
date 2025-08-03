package com.project.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.AddBusDTO;
import com.project.dto.BusRespDTO;
import com.project.entities.Bus;
import com.project.services.BusService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/buses")
@AllArgsConstructor
@Validated
public class BusController {
	
	private final BusService busService;
	
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
	
	@PostMapping
	@Operation(description = "Add new bus")
	public ResponseEntity<?> addNewBus(@RequestBody AddBusDTO dto){
		
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
	public  ResponseEntity<?> listBusesbyRoute(@PathVariable int routeId) {
		return ResponseEntity.ok(busService.getAllBusesByRoute(routeId));
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
}
	





















