package com.travelpedia.api.experiences.service;

import com.travelpedia.api.experiences.model.ExperienceModel;

import java.util.List;

public interface ExperienceService {
    public ExperienceModel createExperience(ExperienceModel experience);
    public ExperienceModel getExperience(String id);
    public ExperienceModel getExperienceByTitle(String title);
    public ExperienceModel getExperienceByRegion(String region);
    public List<ExperienceModel> getAllExperiences();
    public ExperienceModel updateExperience(String id, ExperienceModel experience);
    public void deleteExperience(String id);
}
