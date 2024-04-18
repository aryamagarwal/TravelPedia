package com.travelpedia.api.contactus.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "contactus")
public class ContactusModel {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long contactusId;
    @Column(nullable = false)
    private String name;
    @Column
    private String email;
    @Column
    private String city;
    @Column
    private String mobile;
    @Column
    private String WhatsApp;
    @Column
    private String country;
    @Column
    private String query;

}
