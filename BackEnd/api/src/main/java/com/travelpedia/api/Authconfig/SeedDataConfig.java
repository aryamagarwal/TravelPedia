package com.travelpedia.api.Authconfig;

//package com.example.travelpediabackendjwt.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
//
//import com.example.travelpediabackendjwt.models.Role;
//import com.example.travelpediabackendjwt.models.User;
//import com.example.travelpediabackendjwt.repositories.UserRepository;
//import com.example.travelpediabackendjwt.services.UserService;

import com.travelpedia.api.AuthModel.Role;
import com.travelpedia.api.AuthModel.User;
import com.travelpedia.api.AuthRepository.UserRepository;
import com.travelpedia.api.AuthService.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class SeedDataConfig implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {
        
      if (userRepository.count() == 0) {

        User admin = User
                      .builder()
                      .userName("admin")
                      .firstName("admin")
                      .lastName("admin")
                      .email("admin@admin.com")
                      .password(passwordEncoder.encode("password"))
                      .isVerified(true)
                      .role(Role.ROLE_ADMIN)
                      .build();

        userService.save(admin);
          User testUser = User
                  .builder()
                  .userName("test")
                  .firstName("test")
                  .lastName("test")
                  .email("test@test.com")
                  .password(passwordEncoder.encode("test"))
                  .isVerified(Boolean.TRUE)
                  .role(Role.ROLE_USER)
                  .build();

          userService.save(testUser);

//        log.debug("created ADMIN user - {}", admin);
      }
    }

}
