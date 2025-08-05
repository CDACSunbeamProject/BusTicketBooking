package com.project.services;

import com.project.dto.UserProfileRespDTO;
import com.project.dto.UserRequestDTO;
import com.project.dto.UserRespDTO;
import com.project.entities.User;

public interface UserService {
	UserRespDTO signUp(UserRequestDTO dto);

	UserProfileRespDTO getUserProfileDetails(String email);
}
