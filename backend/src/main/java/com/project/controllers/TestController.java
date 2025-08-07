package com.project.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
	@PostMapping("/test-signin")
    public ResponseEntity<?> testSignin(@RequestBody Map<String, String> payload) {
        System.out.println("Test signin hit with: " + payload);
        return ResponseEntity.ok("ok");
    }
}
