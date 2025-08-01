package com.project.services;

import com.project.entities.User;

public interface AdminService {
	User getUserByEmail(String email);
}
