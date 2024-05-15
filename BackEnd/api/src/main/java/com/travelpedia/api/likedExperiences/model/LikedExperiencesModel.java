package com.travelpedia.api.likedExperiences.model;

import java.util.Optional;


//import com.travelpedia.api.JwtModel.User;
import com.travelpedia.api.JwtModel.User;
import com.travelpedia.api.experiences.model.ExperienceModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="liked_experiences")
public class LikedExperiencesModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO  )
    Long id;
    @ManyToOne
    @JoinColumn(name = "experience_id" , referencedColumnName = "experienceId" , nullable = false  )
    ExperienceModel experience;
    @ManyToOne
    @JoinColumn(name = "user_id" , referencedColumnName = "id" , nullable = false )
    User user;
}
