package com.travelpedia.api.AuthController;

//package com.example.travelpediabackendjwt.controllers;
//
//import com.example.travelpediabackendjwt.dto.JwtAuthenticationResponse;
//import com.example.travelpediabackendjwt.dto.PasswordChangeRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.travelpedia.api.AuthDto.UserDto;
import com.travelpedia.api.AuthModel.User;
import com.travelpedia.api.AuthService.UserService;


//import com.example.travelpediabackendjwt.dto.UserDto;
//import com.example.travelpediabackendjwt.models.User;
//import com.example.travelpediabackendjwt.services.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
	private final UserService us;
	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	
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

//		var pass=encoder.decode(user.getPassword());

		return UserDto.builder()
				.userName(user.getUsername())
				.email(user.getEmail())
				.firstName(user.getFirstName())
				.lastName(user.getLastName())
//				.passWord(encoder.encode(user.getPassword()))

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
	@GetMapping("/myId")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public Long getId() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = (User) authentication.getPrincipal();
		return user.getId();
	}



//	@PostMapping("/checkPass")
//	@ResponseBody
//	public Boolean checkPass(@RequestBody PasswordCheckDto password) {
//		return us.checkPass(password.getPassword());
//	}

	
	
}

