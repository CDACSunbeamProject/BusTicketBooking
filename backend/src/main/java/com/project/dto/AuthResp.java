package com.project.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class AuthResp {
	private Long id;
	private String message;
	private String jwt;
	private String email;
	private String role;
}
