package com.travelpedia.api.experiences.controller;
import com.travelpedia.api.experiences.model.ExperienceModel;

import com.travelpedia.api.experiences.service.ExperienceService;
import com.travelpedia.api.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/permit/experiences")
@CrossOrigin(maxAge = 3600)
//@CrossOrigin(origins = "http://localhost:5173")
public class ExperienceController {
    @Autowired
    ExperienceService es;
    @Autowired
    ReviewService er;
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/all")
    public List<ExperienceModel> getAllExperiences()
    {
        return es.getAllExperiences();
    }
    @GetMapping("/sorted")
    public List<ExperienceModel> getSortedExperiences(@RequestParam("sortParameter") String sortParameter){
        return es.getExperienceSorted(sortParameter);
    }
    @PostMapping("/file-upload")
    public String uploadFile(@RequestParam("file")  MultipartFile file , @RequestParam("title") String title){
        return es.uploadFile(file , title);
    }
    @GetMapping("/experienceImage/{fileName}")
    public ResponseEntity<?> downloadFile(@PathVariable("fileName") String fileName){
      byte [ ] file = es.downloadFile(fileName);
        return ResponseEntity.ok().contentType(MediaType.valueOf("image/jpeg")).body(file);
    }
    @DeleteMapping("/deleteImage/{fileName}")
    public void deleteFile(@PathVariable("fileName") String fileName){
        es.deleteFile(fileName);
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/create")
    public ExperienceModel createExperience(@RequestBody ExperienceModel experience)
    {
//        String s = es.uploadFile(file);
        return es.createExperience(experience);
    }
    @GetMapping("/get/{title}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ExperienceModel getExperienceByTitle(@PathVariable ("title") String title)
    {
        title=title.replace("-"," ");
        return es.getExperienceByTitle(title);
    }
    @PutMapping("/update/{id}")
    public ExperienceModel updateExperience(@PathVariable("id") Long id, @RequestBody ExperienceModel experience)
    {
        return es.updateExperience(id,experience);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteExperience(@PathVariable("id") Long id){
        er.deleteReviewByExperienceId(id);
        es.deleteExperience(id);
    }
    @GetMapping("/search/{region}")
    public List<ExperienceModel> searchExperiences(@PathVariable("region") String region)
    {
        return es.searchExperiences(region);
    }
    @GetMapping("/regions")
    public List<String> getRegions()
    {
        return es.getRegions();
    }

    @GetMapping("/filtered")
    public Page<ExperienceModel> getFilteredExperiences(@RequestParam(value = "pageNo" , defaultValue = "0") Integer pageNo , @RequestParam(value = "pageSize" , defaultValue = "2") Integer pageSize , @RequestParam("Sort") List<String> sort , @RequestParam("regions") List<String> regions , @RequestParam("amount") Integer amount, @RequestParam("days") Integer days){
        return es.getFilteredExperiences(pageNo , pageSize , sort , regions , amount, days);
    }
}