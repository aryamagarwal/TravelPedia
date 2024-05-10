package com.travelpedia.api.wishlist.repository;

import com.travelpedia.api.wishlist.model.WishlistModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WishlistRepository extends JpaRepository<WishlistModel, Long>{

    @Query(value = "SELECT w.experience.experienceId FROM WishlistModel  w WHERE w.user.id = :userId")
    List<Long> findLikedExperienceId(int userId);

}
