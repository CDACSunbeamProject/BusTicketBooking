package com.project.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.custom_exceptions.ApiException;
import com.project.dto.ApiResponse;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.*;

@Entity
@Table(name = "bus")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "tickets")
public class Bus extends BaseEntity {

	@Column(name = "bus_name", length = 50)
	private String busName;

	@Column(name = "bus_no", unique = true, length = 20)
	private String busNo;

	@Column(name = "bus_type", length = 30)
	private String busType;

	@Column(name = "operator_name", length = 50)
	private String operatorName;

	@Column(name = "no_of_seats")
	private int noOfSeats;

	@Column(name = "departure_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private LocalDate departureDate;

	@Column(name = "departure_time")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
	private LocalTime departureTime;

	@Column(name = "arrival_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private LocalDate arrivalDate;

	@Column(name = "arrival_time")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
	private LocalTime arrivalTime;

	@Column(name = "duration")
	private double duration; // in hours or minutes

	@Column(name = "price")
	private double price;

	@Column(name = "rating")
	private Float rating;
	
	@Column(name = "amenities", columnDefinition = "TEXT")
	private String amenities; // store JSON array like ["WiFi", "Blanket"]

	
	// relationships
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "route_id")
	private Route busRoute;

	@Transient
	public List<String> getAmenitiesList() throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(amenities, new TypeReference<List<String>>() {
		});
	}

	@Transient
	public void setAmenitiesList(List<String> amenitiesList) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		this.amenities = objectMapper.writeValueAsString(amenitiesList);
	}

	//private Set<String> bookedSeats = new HashSet<>();

	@OneToMany(mappedBy = "bus", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Ticket> tickets = new ArrayList<>();

	/*public ApiResponse bookSeat(String seatNo) throws Exception{
		if (this.bookedSeats.contains(seatNo)) {
			throw new ApiException("Seat " + seatNo + " is already booked");
		}
		this.bookedSeats.add(seatNo);
		return new ApiResponse(seatNo+" Seat booked successfully");
	}

	public boolean cancelSeat(String seatNo) {
		return bookedSeats.remove(seatNo);
	}
	*/

}
