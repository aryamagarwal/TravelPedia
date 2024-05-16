package com.travelpedia.api.AuthController;
//package com.example.travelpediabackendjwt.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.travelpedia.api.AuthService.EmailService;

//import com.example.travelpediabackendjwt.services.EmailService;

import lombok.RequiredArgsConstructor;


@CrossOrigin(maxAge = 3600)

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test/mail")

public class EmailTestController {
	
  @Autowired
  private EmailService es;
  @GetMapping("/send")
  public ResponseEntity<?> sendTestMail(@RequestParam("email") String email) {
      es.sendOtpVerificationEmail(email, "user" ,"ABCDEF");
      return ResponseEntity.ok().body("test Verification Mail successfully.");
  }
}


