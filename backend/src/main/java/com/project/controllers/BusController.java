package com.project.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.AddBusDTO;
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
	
	
	
	
}
