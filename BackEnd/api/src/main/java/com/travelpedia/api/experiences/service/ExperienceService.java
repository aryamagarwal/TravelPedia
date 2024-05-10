package com.travelpedia.api.experiences.service;

import com.travelpedia.api.experiences.model.ExperienceModel;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
    public List<ExperienceModel> searchExperiences(String region);
     public String uploadFile(MultipartFile file, String title);
 public byte[] downloadFile(String fileName);

    public void deleteFile(String fileName);
}
