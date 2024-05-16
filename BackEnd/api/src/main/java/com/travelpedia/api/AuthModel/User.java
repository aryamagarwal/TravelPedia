package com.travelpedia.api.AuthModel;

//package com.example.travelpediabackendjwt.models;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "users")
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;
  
  @Column(unique = true)
  String userName;

  @Column(unique = true)
  String email;

  String firstName;
  
  String lastName;

  String password;

  @Enumerated(EnumType.STRING)
  Role role;

  @Temporal(TemporalType.TIMESTAMP)
  Instant createdAt;

  @Temporal(TemporalType.TIMESTAMP)
  Instant updatedAt;

  Boolean isVerified;
  
  String verificationToken;

  @Temporal(TemporalType.TIMESTAMP)
  Instant tokenExpiryTime;
  
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
      return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getUsername() {
      // our "username" for security is the userName field
      return userName;
  }

  @Override
  public boolean isAccountNonExpired() {
      return true;
  }

  @Override
  public boolean isAccountNonLocked() {
      return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
      return true;
  }

  @Override
  public boolean isEnabled() {
      return true;
  }

}
