package com.travelpedia.api.AuthDto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdateDetailsDto{
    String username;
    String firstname;
    String lastname;
    String email;
    String oldPassword;
    String newPassword;
}
