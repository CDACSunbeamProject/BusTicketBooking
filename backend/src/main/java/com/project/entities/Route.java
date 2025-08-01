package com.project.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "routes")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Route extends BaseEntity{
	@Column(name="start_loc")
	private String startLocation;
	
	@Column(name="end_loc")
	private String endLocation;
	
	@OneToMany(mappedBy = "busRoute")
	private List<Bus> buses;

	public Route(String startLocation, String endLocation) {
		this.startLocation = startLocation;
		this.endLocation = endLocation;
	}
	
}
