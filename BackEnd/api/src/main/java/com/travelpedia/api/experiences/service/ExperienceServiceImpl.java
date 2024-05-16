package com.travelpedia.api.experiences.service;

import com.travelpedia.api.experiences.model.ExperienceModel;
import com.travelpedia.api.experiences.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;

@Service
public class ExperienceServiceImpl implements ExperienceService {
    @Value("${experience.image.location}")
    private String location;

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
        old.setDescriptionTitle(experience.getDescriptionTitle());
        old.setDescription(experience.getDescription());
        old.setEssence(experience.getEssence());
        old.setLocation(experience.getLocation());
        old.setRegion(experience.getRegion());
        old.setAmount(experience.getAmount());
        old.setDays(experience.getDays());
        return er.save(old);
    }

    @Override
    public void deleteExperience(Long id) {
       ExperienceModel em =  er.findByExperienceId(id);
       deleteFile(em.getTitle());
        er.deleteById(id);
    }

    @Override
    public Page<ExperienceModel> getFilteredExperiences(Integer pageNo , Integer pageSize , List<String> sortOrder , List<String> regions , Integer amount, Integer days) {
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
        Pageable pageable=PageRequest.of(pageNo , pageSize,sort);
        return er.findAllFiltered(regions , amount,days , pageable);
    }
    @Override
    public List<String> getRegions() {

        List<ExperienceModel> em= er.findAll();
        return em.stream().map(ExperienceModel::getRegion).distinct().toList();
    }

    @Override
    public List<ExperienceModel> searchExperiences(String region) {
        return er.searchExperiences(region);
    }

    @Override
    public String uploadFile(MultipartFile file, String title) {
        if (file.isEmpty())
            return "File is empty";
        //check if location directory exists or not
        Path path = Paths.get(location);
        if (!path.toFile().exists())
            try {
               Files.createDirectories(path);
            } catch (Exception e) {
                return "Error in creating directory";
            }
           try(InputStream is = file.getInputStream()){
               Path filePath = Paths.get(location + "\\" + title);
               Files.copy(is, filePath , StandardCopyOption.REPLACE_EXISTING);
           }
           catch (Exception e){
               return "Error in uploading file";
           }
      return "file uploaded successfully";
    }


    @Override
    public byte[] downloadFile(String fileName) {
        try {
            Path path = Paths.get(location + "\\" + fileName);
            return Files.readAllBytes(path);
        }
        catch (Exception e){
            return new byte[0];
        }

    }

    @Override
    public void deleteFile(String fileName) {
        try {
            Path path = Paths.get(location + "\\" + fileName);
            Files.deleteIfExists(path);
        }
        catch (Exception e){
            System.out.println("Error in deleting file");
        }
    }


}
