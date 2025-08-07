package com.project.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class AuthResp {
	private String message;
	private String jwt;
	
}
