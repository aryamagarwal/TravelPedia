package com.travelpedia.api.JwtController;
//package com.example.travelpediabackendjwt.controllers;

//import com.example.travelpediabackendjwt.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.travelpedia.api.JwtDto.JwtAuthenticationResponse;
import com.travelpedia.api.JwtDto.LogInRequest;
import com.travelpedia.api.JwtDto.MessageResponse;
import com.travelpedia.api.JwtDto.OtpRequest;
import com.travelpedia.api.JwtDto.PasswordChangeRequest;
import com.travelpedia.api.JwtDto.SignUpRequest;
import com.travelpedia.api.JwtModel.User;
import com.travelpedia.api.JwtService.AuthenticationService;
import com.travelpedia.api.JwtService.UserService;

//import com.example.travelpediabackendjwt.models.User;
//import com.example.travelpediabackendjwt.services.AuthenticationService;
//import com.example.travelpediabackendjwt.services.UserService;
//import com.travelpedia.api.UserModel.UserModel;

import lombok.RequiredArgsConstructor;


@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	@Autowired
	private UserService es;

    private final AuthenticationService authenticationService;
   
//	@CrossOrigin(origins = "http://localhost:5173")
	@PutMapping("/update/{id}")
	public User updateUser(@PathVariable("id") Long id, @RequestBody User user) {
		return es.updateUser(id,user);
	}
	
//	@CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/signup")
    public JwtAuthenticationResponse signup(@RequestBody SignUpRequest req) {
        return authenticationService.signUp(req);
    }

//	@CrossOrigin(origins = "http://localhost:5173")
	@PostMapping("/login")
    public JwtAuthenticationResponse login(@RequestBody LogInRequest req) {
        return authenticationService.login(req);
    }

	@PostMapping("/sendOTP")
	public MessageResponse sendOTP(@RequestBody OtpRequest req) {
		return authenticationService.sendOtp(req);
	}
	

	@PostMapping("/verifyUser")
	public JwtAuthenticationResponse verifyUser(@RequestBody LogInRequest req) {
		return authenticationService.verifyUser(req);
	}
	
	
	@PostMapping("/forgotPass")
	public JwtAuthenticationResponse resetPass(@RequestBody PasswordChangeRequest req) {
		return authenticationService.resetPass(req);
	}
	
}