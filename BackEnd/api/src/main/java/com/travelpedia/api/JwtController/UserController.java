package com.travelpedia.api.JwtController;

//package com.example.travelpediabackendjwt.controllers;
//
//import com.example.travelpediabackendjwt.dto.JwtAuthenticationResponse;
//import com.example.travelpediabackendjwt.dto.PasswordChangeRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.travelpedia.api.JwtDto.UserDto;
import com.travelpedia.api.JwtModel.User;
import com.travelpedia.api.JwtService.UserService;

//import com.example.travelpediabackendjwt.dto.UserDto;
//import com.example.travelpediabackendjwt.models.User;
//import com.example.travelpediabackendjwt.services.UserService;

import lombok.RequiredArgsConstructor;


@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
	private final UserService us;
	
	
	
	@PostMapping("/checkUsername")
	@ResponseBody
	public Boolean checkUsername(@RequestBody UserDto username) {
		return us.checkUser(username.getUserName());
	}
	
	@PostMapping("/checkEmail")
	@ResponseBody
	public Boolean checkEmail(@RequestBody UserDto email) {
		return us.checkEmail(email.getEmail());
	}

	@GetMapping("/myName")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public String getName() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = (User) authentication.getPrincipal();
		return user.getFirstName() + " " + user.getLastName();
	}

	@GetMapping("/me")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	@ResponseBody
	public UserDto getMyDetails() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = (User) authentication.getPrincipal();
		return UserDto.builder()
				.userName(user.getUsername())
				.email(user.getEmail())
				.firstName(user.getFirstName())
				.lastName(user.getLastName())
				.build();
	}
	

//	@PutMapping("/forgotPass")
//	@PreAuthorize("hasAuthority('ROLE_USER')")
//	@ResponseBody
//	public JwtAuthenticationResponse changePassword(@RequestBody PasswordChangeRequest req) {
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		User user = (User) authentication.getPrincipal();
//		return us.updatePassword(req, user);
//	}
}

