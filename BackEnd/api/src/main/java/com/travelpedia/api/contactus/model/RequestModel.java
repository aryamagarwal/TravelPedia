package com.travelpedia.api.contactus.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestModel {
    private long contactusId;
   private String name;
   private String email;
//   private String city;
//    private String mobile;
//    private String WhatsApp;
//    private String country;
    private String query;
}
