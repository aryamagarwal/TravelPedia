package com.travelpedia.api.experiences.service;

import com.travelpedia.api.experiences.model.ExperienceModel;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface ExperienceService {
    public ExperienceModel createExperience(ExperienceModel experience);
    public ExperienceModel getExperience(Long id);
    public List<ExperienceModel> getExperienceSorted(String sortParameter);
    public ExperienceModel getExperienceByTitle(String title);
    public ExperienceModel getExperienceByRegion(String region);
    public List<ExperienceModel> getAllExperiences();
    public ExperienceModel updateExperience(Long id, ExperienceModel experience);
    public void deleteExperience(Long id);
    public Page<ExperienceModel> getFilteredExperiences(Integer pageNo , Integer pageSize , List<String> sortOrder , List<String> regions , Integer amount, Integer days);
    public List<String> getRegions();
}
