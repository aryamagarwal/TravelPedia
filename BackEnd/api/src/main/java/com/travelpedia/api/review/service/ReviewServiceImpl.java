package com.travelpedia.api.review.service;

import com.travelpedia.api.experiences.service.ExperienceService;
import com.travelpedia.api.experiences.service.ExperienceServiceImpl;
import com.travelpedia.api.review.model.ReviewModel;
import com.travelpedia.api.review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{
    @Autowired
    ExperienceService es;
    @Autowired
    ReviewRepository rr;

    @Override
    public ReviewModel addReview(ReviewModel review) {
        return rr.save(review);
    }

    @Override
    public List<ReviewModel> getByExperienceId(Long id) {
        return rr.findByExperienceExperienceId(id);
    }

    @Override
    public void deleteReview(Long reviewId) {
        rr.deleteById(reviewId);
    }
}
