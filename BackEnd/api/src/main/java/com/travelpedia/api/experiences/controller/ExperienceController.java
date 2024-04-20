package com.travelpedia.api.experiences.controller;
import com.travelpedia.api.experiences.model.ExperienceModel;
import com.travelpedia.api.experiences.service.ExperienceService;
import com.travelpedia.api.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/experiences")
@CrossOrigin(origins = "http://localhost:5173")
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

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/create")
    public ExperienceModel createExperience(@RequestBody ExperienceModel experience)
    {
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
    @GetMapping("/regions")
    public List<String> getRegions()
    {
        return es.getRegions();
    }

    @GetMapping("/filtered")
    public List<ExperienceModel> getFilteredExperiences(@RequestParam("Sort") List<String> sort , @RequestParam("regions") List<String> regions , @RequestParam("amount") Integer amount, @RequestParam("days") Integer days){

        return es.getFilteredExperiences(sort , regions , amount, days);
    }
}
