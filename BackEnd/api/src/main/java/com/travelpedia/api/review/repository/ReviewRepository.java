package com.travelpedia.api.review.repository;

import com.travelpedia.api.review.model.ReviewModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<ReviewModel , Long> {
    List<ReviewModel> findByExperienceExperienceId(Long experienceId);
    ReviewModel findByReviewId(Long reviewId);
    
}
