package com.travelpedia.api.Authconfig;

//package com.example.travelpediabackendjwt.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import com.example.travelpediabackendjwt.filters.JwtAuthenticationFilter;
//import com.example.travelpediabackendjwt.services.UserService;

import com.travelpedia.api.AuthFilter.JwtAuthenticationFilter;
import com.travelpedia.api.AuthService.UserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;

  @Bean
  public AuthenticationProvider authenticationProvider() {
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
      authProvider.setUserDetailsService(userService.userDetailsService());
      authProvider.setPasswordEncoder(passwordEncoder);
      return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
      return config.getAuthenticationManager();
  }
  
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration configuration = new CorsConfiguration();
      configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:5173", "http://localhost:8080","http://13.60.74.234:8085"));
      configuration.setAllowedMethods(Arrays.asList(CorsConfiguration.ALL));
      configuration.setAllowedHeaders(Arrays.asList(CorsConfiguration.ALL));
      configuration.setMaxAge((long) 3600);
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", configuration);
      return source;
  }
  
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//	  http
//      .headers(header -> header.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Origin", "http://localhost:5173")));
//	  http
//      .headers(header -> header.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Credentials", "true")));

	http
//    .exceptionHandling(c -> c.authenticationEntryPoint(
//    		new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
    .cors(cors -> cors.configurationSource(corsConfigurationSource()))
    .csrf(c ->c.disable()
    )
    .sessionManagement(session -> session
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    )
    .authorizeHttpRequests(authorize -> authorize
      .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
             .requestMatchers("/permit/**").permitAll()
//            .requestMatchers(HttpMethod.POST, "/api/test/mail/**").permitAll()
      .requestMatchers(HttpMethod.POST, "/api/auth/signup", "/api/auth/login").permitAll()
      .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
      .requestMatchers(HttpMethod.GET, "/api/test/**").permitAll()
      .requestMatchers(HttpMethod.POST, "/api/test/**").permitAll()
	  .requestMatchers(HttpMethod.GET, "/api/user/**").permitAll()
	  .requestMatchers(HttpMethod.POST, "/api/user/**").permitAll()
	  .requestMatchers("/permit/experiences/**").permitAll()
      .anyRequest().authenticated()

      
    )
    .authenticationProvider(authenticationProvider()).addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
  
  
}
