package com.travelpedia.api.experiences.service;

import com.travelpedia.api.experiences.model.ExperienceModel;
import com.travelpedia.api.experiences.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceServiceImpl implements ExperienceService {
 @Autowired
 ExperienceRepository er;
    @Override
    public ExperienceModel createExperience(ExperienceModel experience) {
        return er.save(experience);
    }

    @Override
    public ExperienceModel getExperience(Long id) {
        return er.findByExperienceId(id);
    }

    @Override
    public ExperienceModel getExperienceByTitle(String title) {
        return er.findByTitle(title);
    }

    @Override
    public ExperienceModel getExperienceByRegion(String region) {
        return er.findByRegion(region);
    }

    @Override
    public List<ExperienceModel> getAllExperiences() {
        return er.findAll();
    }

    @Override
    public ExperienceModel updateExperience(Long id, ExperienceModel experience) {
        ExperienceModel old=er.findByExperienceId(id);
        old.setTitle(experience.getTitle());
        old.setDescription(experience.getDescription());
        old.setLocation(experience.getLocation());
        old.setImageUrl(experience.getImageUrl());
        old.setRegion(experience.getRegion());
        old.setAmount(experience.getAmount());
        old.setDays(experience.getDays());
        return er.save(old);
    }

    @Override
    public void deleteExperience(Long id) {
        er.deleteById(id);
    }
}
