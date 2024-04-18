package com.travelpedia.api.review.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.travelpedia.api.experiences.model.ExperienceModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "reviews")
public class ReviewModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long reviewId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String review;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experience_id", nullable = false)
    @JsonIgnore
    private ExperienceModel experience ;
}
