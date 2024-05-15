package com.travelpedia.api.JwtService;

//package com.example.travelpediabackendjwt.services;

import java.time.Instant;
//
//import com.example.travelpediabackendjwt.dto.JwtAuthenticationResponse;
//import com.example.travelpediabackendjwt.dto.PasswordChangeRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
//
//import com.example.travelpediabackendjwt.models.User;
//import com.example.travelpediabackendjwt.repositories.UserRepository;

import com.travelpedia.api.JwtDto.JwtAuthenticationResponse;
import com.travelpedia.api.JwtDto.PasswordChangeRequest;
import com.travelpedia.api.JwtModel.User;
import com.travelpedia.api.JwtRepository.UserRepository;

//import com.travelpedia.api.UserRepository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepo;
    private final JwtService jwtService;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String userName) {
              return userRepo.findByUserName(userName)
                      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    public User save(User newUser) {
        if (newUser.getId() == null) {
            newUser.setCreatedAt(Instant.now());
            newUser.setIsVerified(false);
            //		  TODO add sendVerificationMail here
            //		  sendVerificationEmail(newUser);
        }
        newUser.setUpdatedAt(Instant.now());
        return userRepo.save(newUser);
    }

    public User updateUser(Long id,User User) {
        java.util.Optional< User> optionalOldUser = userRepo.findById(id);
        if (optionalOldUser.isPresent()) {
            User old = optionalOldUser.get();
            old.setUserName(User.getUsername());
            old.setFirstName(User.getFirstName());
            old.setLastName(User.getLastName());
            old.setEmail(User.getEmail());
            old.setPassword(User.getPassword());

            return save(old);
        }
        return null;
    }

    public JwtAuthenticationResponse updatePassword(PasswordChangeRequest req, User user) {
        var jwt = "";
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user = save(user);
        jwt = jwtService.generateToken(user);

        return JwtAuthenticationResponse.builder().token(jwt).status(false).build();
    }
  
    public Boolean checkUser(String username) {
        return userRepo.existsByUserName(username);
    }
    public Boolean checkEmail(String email) {
        return  userRepo.existsByEmail(email);
    }
}
