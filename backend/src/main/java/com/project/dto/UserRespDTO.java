package com.project.dto;

import java.util.List;

import com.project.entities.Booking;
import com.project.entities.UserRole;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRespDTO extends BaseDTO{
	private String name;
	private String email;
	private int age;
	private String gender;
	private String phone;
	private UserRole role;
	private long noOfBookings;
}
