package com.travelpedia.api.likedExperiences.controller;

import com.travelpedia.api.likedExperiences.service.LikedExperienceService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/likedExperiences")
public class LikedExperiencesController {
    @Autowired
    LikedExperienceService les;
    @PostMapping("/{experienceId}/{userId}")
    public void likeExperience(@PathVariable("experienceId") Long experienceId, @PathVariable("userId") Long userId) {
       les.likeExperience(experienceId, userId);
    }
    @DeleteMapping("/{experienceId}/{userId}")
    public void deleteLikedExperience(@PathVariable("experienceId") Long experienceId, @PathVariable("userId") Long userId) {
       try {
          les.unlikeExperience(experienceId, userId);
       }
         catch (Exception e) {
              System.out.println("error:"+ e);
         }
    }
    @GetMapping("/isLiked/{experienceId}/{userId}")
    public boolean isLiked(@PathVariable("experienceId") Long experienceId, @PathVariable("userId") Long userId) {

        return les.isLiked(experienceId, userId);
    }
    @DeleteMapping("/deleteByUser/{userId}")
    public void deleteLikedExperienceByUser(@PathVariable("userId") Long userId) {
        try {
            les.deleteLikedExperienceByUser(userId);
        }
        catch (Exception e) {
            System.out.println(e);
        }
    }
    @DeleteMapping("/deleteByExperience/{experienceId}")
    public void deleteLikedExperienceByExperience(@PathVariable("experienceId") Long experienceId) {
        les.deleteLikedExperienceByExperience(experienceId);
    }
}
