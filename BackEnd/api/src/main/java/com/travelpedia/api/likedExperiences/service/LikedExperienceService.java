package com.travelpedia.api.likedExperiences.service;

public interface LikedExperienceService {
    public void likeExperience(Long experienceId, Long userId);
    public void unlikeExperience(Long experienceId, Long userId);
    public boolean isLiked(Long experienceId, Long userId);

    public void deleteLikedExperienceByUser(Long userId);
    public void deleteLikedExperienceByExperience(Long experienceId);
}
