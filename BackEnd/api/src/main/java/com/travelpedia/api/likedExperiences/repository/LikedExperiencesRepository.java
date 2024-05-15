package com.travelpedia.api.likedExperiences.repository;

import com.travelpedia.api.likedExperiences.model.LikedExperiencesModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LikedExperiencesRepository extends JpaRepository<LikedExperiencesModel,Long> {
    LikedExperiencesModel findByExperience_ExperienceIdAndUser_Id(Long experience_experienceId, Long user_id);
    void deleteByUser_Id(Long i);
    void deleteByExperience_ExperienceId(Long experienceId);
}
