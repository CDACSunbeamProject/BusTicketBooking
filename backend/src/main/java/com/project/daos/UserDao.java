package com.project.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.User;

public interface UserDao extends JpaRepository<User, Integer>{
	Optional<User> findByEmail(String email);
	//optional: It prevents NullPointerExceptions and encourages developers to handle the possibility of the value being missing.
	//derived finder
		boolean existsByEmail(String email);
	
}
