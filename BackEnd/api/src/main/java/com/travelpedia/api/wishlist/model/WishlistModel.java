package com.travelpedia.api.wishlist.model;

import com.travelpedia.api.JwtModel.User;
import com.travelpedia.api.UserModel.UserModel;
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
@Table(name = "wishlist")
public class WishlistModel {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
    private long wishlistId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experience_id", nullable = false)
    private ExperienceModel experience;
}
