package com.travelpedia.api.review.service;

import com.travelpedia.api.experiences.service.ExperienceService;
import com.travelpedia.api.experiences.service.ExperienceServiceImpl;
import com.travelpedia.api.review.model.ReviewModel;
import com.travelpedia.api.review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface ReviewService {
    public ReviewModel addReview(ReviewModel review);
    public List<ReviewModel> getByExperienceId(Long id);
    public void deleteReview(Long reviewId);
    public ReviewModel updateReview(Long reviewId, String username, String review);
    public void deleteReviewByExperienceId(Long experienceId);
    public List<ReviewModel> getAllReviews();

}
