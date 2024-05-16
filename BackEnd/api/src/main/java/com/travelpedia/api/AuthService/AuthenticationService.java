package com.travelpedia.api.AuthService;


//package com.example.travelpediabackendjwt.services;

//import com.example.travelpediabackendjwt.dto.*;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.travelpedia.api.AuthDto.JwtAuthenticationResponse;
import com.travelpedia.api.AuthDto.LogInRequest;
import com.travelpedia.api.AuthDto.MessageResponse;
import com.travelpedia.api.AuthDto.OtpRequest;
import com.travelpedia.api.AuthDto.PasswordChangeRequest;
import com.travelpedia.api.AuthDto.SignUpRequest;
import com.travelpedia.api.AuthModel.Role;
import com.travelpedia.api.AuthModel.User;
import com.travelpedia.api.AuthRepository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
      private final UserRepository userRepository;
      private final UserService userService;
      private final PasswordEncoder passwordEncoder;
      private final JwtService jwtService;
      private final OtpService otpService;
      private final AuthenticationManager authenticationManager;

    public JwtAuthenticationResponse signUp(SignUpRequest request) {
        var user = User
                  .builder()
                  .userName(request.getUserName())
                  .firstName(request.getFirstName())
                  .lastName(request.getLastName())
                  .email(request.getEmail())
                  .password(passwordEncoder.encode(request.getPassword()))
                  .isVerified(Boolean.FALSE)
                  .role(Role.ROLE_USER)
                  .build();

        user = userService.save(user);
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).status(false).build();
    }
    
    public JwtAuthenticationResponse resetPass(PasswordChangeRequest request) {
    	var user = userRepository.findByUserNameOrEmail(request.getUserNameOrEmail()).orElse(null);
    	
    	if(user==null) {
            return JwtAuthenticationResponse.builder().status(false).build();
    	}
    	System.out.println(user);
    	user.setIsVerified(Boolean.FALSE);
    	System.out.println(user);
        user = userService.save(user);
    	user.setPassword(passwordEncoder.encode(request.getPassword()));
    	
//    	System.out.println(user.getPassword());
    	
    	authenticationManager.authenticate(
                 new UsernamePasswordAuthenticationToken(user.getUsername(), request.getPassword()));
    	System.out.println("After authentication");
//    	 user.setIsVerified(Boolean.FALSE);
    			  
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).status(false).build();
    }

    public JwtAuthenticationResponse login(LogInRequest request) {
        var user = userRepository.findByUserNameOrEmail(request.getUserNameOrEmail())
                .orElse(null);
        //              .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if(user==null) {
          return JwtAuthenticationResponse.builder().status(false).build();
        }
        System.out.println("Before authentication");
        authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(user.getUsername(), request.getPassword()));
        System.out.println("After authentication");
        var jwt = jwtService.generateToken(user);
        var status = user.getIsVerified();

        return JwtAuthenticationResponse.builder().token(jwt).status(status).build();
    }

    public MessageResponse sendOtp(OtpRequest request) {
        var user = userRepository.findByUserNameOrEmail(request.getUserNameOrEmail())
                .orElse(null);
        var msg = "";
        boolean status = false;

        if(user == null) {
            msg = "Invalid Username or Email!";
        } else if(!user.getIsVerified()) {
            status = otpService.sendOTP(user);
            if(!status)
                msg = "Couldn't Send OTP. Please try after sometime.";
        } else {
            msg = "Already Verified";
        }
        return MessageResponse.builder().status(status).message(msg).build();
    }

    public JwtAuthenticationResponse verifyUser(LogInRequest request) {
        var user = userRepository.findByUserNameOrEmail(request.getUserNameOrEmail())
              .orElse(null);
        String msg = "";
        String jwt = "";
        boolean status = false;
        if(user == null) {
          msg = "Invalid Username!";
        } else if(!user.getIsVerified()) {
            // Validate OTP
            Object[] verStatus = otpService.validateOTP(user, request.getPassword());
            msg = (String) verStatus[0];
            status = (Boolean) verStatus[1];
        } else {
          status = true;
          msg = "OTP already verified";
        }
        if(status)
            jwt = jwtService.generateToken(user);

        return JwtAuthenticationResponse.builder().token(jwt).status(status).message(msg).build();
    }
}
