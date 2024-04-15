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
    public ExperienceModel getExperiencebyTitle(@RequestParam("title") String title)
    {
        title=title.replace("-"," ");
        return es.getExperienceByTitle(title);
    }
    @PutMapping("/update/{id}")
    public ExperienceModel updateExperience(@RequestParam("id") String id, @RequestBody ExperienceModel experience)
    {
        return es.updateExperience(id,experience);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteExperience(@RequestParam("id") String id){
        es.deleteExperience(id);
    }
}
