package com.project.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Admin;

public interface AdminDao extends JpaRepository<Admin, Integer>{
	
}
