package com.travelpedia.api.likedExperiences.service;

import com.travelpedia.api.likedExperiences.model.LikedExperiencesModel;

import java.util.List;

public interface LikedExperienceService {
    public void likeExperience(Long experienceId, Long userId);
    public void unlikeExperience(Long experienceId, Long userId);
    public boolean isLiked(Long experienceId, Long userId);

    public void deleteLikedExperienceByUser(Long userId);
    public void deleteLikedExperienceByExperience(Long experienceId);

  public List<LikedExperiencesModel> getLikedExperienceByUser(Long userId);
}
