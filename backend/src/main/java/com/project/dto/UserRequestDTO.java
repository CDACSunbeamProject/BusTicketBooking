package com.project.dto;

import org.hibernate.validator.constraints.Range;

import com.project.entities.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
public class UserRequestDTO {
	@NotBlank(message = "name is required")
	//@Length(min = 5, max = 20, message = "invalid length of firstname")
	private String name;
	
	@NotBlank
	@Email(message = "invalid email format")
	private String email;
	@Pattern
	(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", 
	message = "Invalid password format")
	private String password;
	
	@Min(value = 1, message = "age must be at least 1")
	private int age;

	
	@NotBlank(message = "Gender is required")
	private String gender;
	
	@NotBlank(message = "Phone number is required")
	@Pattern(
	    regexp = "^[6-9]\\d{9}$",
	    message = "Invalid phone number format. Must be a 10-digit number starting with 6-9"
	)
	private String phone;
	
//	@NotNull
//	private UserRole role;
	
}
