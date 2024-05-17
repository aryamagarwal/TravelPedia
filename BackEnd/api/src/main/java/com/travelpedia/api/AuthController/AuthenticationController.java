package com.travelpedia.api.AuthController;
//package com.example.travelpediabackendjwt.controllers;

//import com.example.travelpediabackendjwt.dto.*;
import com.travelpedia.api.AuthDto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.travelpedia.api.AuthModel.User;
import com.travelpedia.api.AuthService.AuthenticationService;
import com.travelpedia.api.AuthService.UserService;

//import com.example.travelpediabackendjwt.models.User;
//import com.example.travelpediabackendjwt.services.AuthenticationService;
//import com.example.travelpediabackendjwt.services.UserService;
//import com.travelpedia.api.UserModel.UserModel;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	@Autowired
	private UserService es;
	private final UserService us;

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
	@PostMapping("/updateDetails")
	public JwtAuthenticationResponse updateDetails(@RequestBody UpdateDetailsDto req) {

		return authenticationService.updateDetails(req);
	}
	@PostMapping("/file-upload")
//	@PreAuthorize("hasAuthority('ROLE_USER')")
	public String uploadFile(@RequestParam("file") MultipartFile file , @RequestParam("title") String title){
		System.out.println("in upload section");
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return us.uploadFile(file , title);
	}
	@GetMapping("/experienceImage/{fileName}")
//	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<?> downloadFile(@PathVariable("fileName") String fileName){
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		byte [ ] file = us.downloadFile(fileName);
		return ResponseEntity.ok().contentType(MediaType.valueOf("image/jpeg")).body(file);
	}


//
	
	
}