package com.travelpedia.api.experiences.service;

import com.travelpedia.api.experiences.model.ExperienceModel;
import com.travelpedia.api.experiences.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public List<ExperienceModel> getExperienceSorted(String sortParameter) {
        Sort sort=Sort.by(Sort.Direction.ASC,sortParameter);
        return er.findAll(sort);
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

    @Override
    public List<ExperienceModel> getFilteredExperiences(List<String> sortOrder , List<String> regions , Integer amount, Integer days) {
        Sort sort = Sort.unsorted();
        boolean flag=true;
        for (int i = 0; i < sortOrder.size(); i += 2) {
            if(flag) {
                sort = Sort.by(Sort.Direction.fromString(sortOrder.get(i+1)), sortOrder.get(i));
                flag=false;
            }
            else
                sort=sort.and(Sort.by(Sort.Direction.fromString(sortOrder.get(i+1)), sortOrder.get(i)));
        }
        return er.findAllFiltered(regions , amount,days , sort);

    }

    @Override
    public List<String> getRegions() {

        List<ExperienceModel> em= er.findAll();
        return em.stream().map(ExperienceModel::getRegion).distinct().toList();
    }


}
