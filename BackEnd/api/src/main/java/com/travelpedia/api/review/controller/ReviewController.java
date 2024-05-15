package com.travelpedia.api.review.controller;

import com.travelpedia.api.experiences.model.ExperienceModel;
import com.travelpedia.api.experiences.service.ExperienceService;
import com.travelpedia.api.review.model.ReviewModel;
import com.travelpedia.api.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permit/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    ReviewService rs;
    @Autowired
    ExperienceService es;
    @GetMapping("/{experienceTitle}")
    @CrossOrigin(origins = "http://localhost:5173")
    public List<ReviewModel> getByExperienceId(@PathVariable("experienceTitle")String Title) {
        Long id=es.getExperienceByTitle(Title).getExperienceId();
        return rs.getByExperienceId(id);
    }

    @GetMapping("/all")
    public List<ReviewModel> getAllReviews() {
        return rs.getAllReviews();
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/add")
    public ReviewModel addReview(@RequestParam("experienceId") Long experienceId  , @RequestParam ("username") String username , @RequestParam("review") String review) {
        ExperienceModel ex=es.getExperience(experienceId );
        ReviewModel r=new ReviewModel();
        r.setExperience(ex);
        r.setUsername(username);
        r.setReview(review);
        return rs.addReview(r);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/delete/{reviewId}")
    public void deleteReview(@PathVariable("reviewId") Long reviewId) {
        rs.deleteReview(reviewId);
    }
    @DeleteMapping("/delete/{experienceId}")
    public void deleteReviewByExperienceId(@PathVariable("experienceId") Long experienceId) {
        rs.deleteReviewByExperienceId(experienceId);
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/update/{reviewId}")
    public ReviewModel updateReview(@PathVariable("reviewId") Long reviewId, @RequestParam("username") String username, @RequestParam ("review") String review) {
        return rs.updateReview(reviewId, username, review);
    }

}
