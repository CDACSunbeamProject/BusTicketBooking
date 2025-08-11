package com.project.services;

import java.util.List;

import com.project.dto.BookingRespDTO;
import com.project.dto.MyBookingRespDTO;
import com.project.dto.UserProfileDTO;
import com.project.dto.UserRequestDTO;
import com.project.dto.UserRespDTO;
import com.project.entities.User;

public interface UserService {
	UserRespDTO signUp(UserRequestDTO dto);

	UserProfileDTO getUserProfileDetails(String email);
	UserProfileDTO updateProfile(UserProfileDTO dto);
	List<MyBookingRespDTO> getMyBookings(String email);

	List<UserRespDTO> getAllUsers();
	List<BookingRespDTO> getAllBookings();
	long getTotalAmount();
}
