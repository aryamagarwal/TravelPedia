package com.travelpedia.api.experiences.repository;

import com.travelpedia.api.experiences.model.ExperienceModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<ExperienceModel, Long> {
    ExperienceModel findByTitle(String title);
    ExperienceModel findByRegion(String region);
    ExperienceModel findByExperienceId(Long id);
}
