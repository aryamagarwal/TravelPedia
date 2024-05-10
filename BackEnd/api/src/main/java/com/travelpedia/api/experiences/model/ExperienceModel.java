package com.travelpedia.api.experiences.model;

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
@Table(name = "experiences")
//@NamedQuery(name = "ExperienceModel.findAllFiltered" ,
//query = "SELECT e from ExperienceModel e WHERE e.region IN (:regions) AND e.amount <= :amount AND e.days <= :days")
public class ExperienceModel {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long experienceId;
    @Column(unique = true, nullable = false)
    private String title;
    @Column(nullable = false , length= 5000)
    private String description;
    @Column(nullable = false)
    private String location;
//    @Column(nullable = false)
//    private String imageUrl;

    @Column(nullable = false)
    private String region;
    @Column(nullable = false)
    private long amount;
    @Column(nullable = false)
    private int days;
}
