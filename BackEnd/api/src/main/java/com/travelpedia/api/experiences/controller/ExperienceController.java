package com.travelpedia.api.experiences.controller;

import com.travelpedia.api.experiences.model.ExperienceModel;
import com.travelpedia.api.experiences.service.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/experiences")
public class ExperienceController {
    @Autowired
    ExperienceService es;
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/all")
    public List<ExperienceModel> getAllExperiences()
    {
        return es.getAllExperiences();
    }
    @PostMapping("/create")
    public ExperienceModel createExperience(@RequestBody ExperienceModel experience)
    {
        return es.createExperience(experience);
    }
    @GetMapping("/get/{title}")
    public ExperienceModel getExperienceByTitle(@RequestParam("title") String title)
    {
        title=title.replace("-"," ");
        return es.getExperienceByTitle(title);
    }
    @PutMapping("/update/{id}")
    public ExperienceModel updateExperience(@RequestParam("id") Long id, @RequestBody ExperienceModel experience)
    {
        return es.updateExperience(id,experience);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteExperience(@RequestParam("id") Long id){
        es.deleteExperience(id);
    }
}
