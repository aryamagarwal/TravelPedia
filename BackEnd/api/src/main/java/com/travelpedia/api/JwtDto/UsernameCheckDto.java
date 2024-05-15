package com.travelpedia.api.JwtDto;

//package com.example.travelpediabackendjwt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsernameCheckDto {
	String userName;
}