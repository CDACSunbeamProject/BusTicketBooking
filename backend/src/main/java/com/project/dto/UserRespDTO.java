package com.project.dto;

import com.project.entities.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
public class UserRespDTO extends BaseDTO{
	private String name;
	private String email;
	private int age;
	private String gender;
	private String phone;
	private UserRole role;
}
