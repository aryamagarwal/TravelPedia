package com.travelpedia.api.likedExperiences.service;

import com.travelpedia.api.UserModel.UserModel;
import com.travelpedia.api.UserRepository.UserRepository;
import com.travelpedia.api.experiences.repository.ExperienceRepository;
import com.travelpedia.api.likedExperiences.model.LikedExperiencesModel;
import com.travelpedia.api.likedExperiences.repository.LikedExperiencesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikedExperienceServiceImpl implements LikedExperienceService{
    @Autowired
    LikedExperiencesRepository ler;
    @Autowired
    ExperienceRepository er;
    @Autowired
    UserRepository um;
    @Override
    public void likeExperience(Long experienceId, Long userId) {
        LikedExperiencesModel lem=new LikedExperiencesModel();
        lem.setExperience(er.findByExperienceId(experienceId));
        lem.setUser(um.findByUserId(userId));
        ler.save(lem);
    }

    @Override
    public void unlikeExperience(Long experienceId, Long userId) {
        LikedExperiencesModel lem = ler.findByExperience_ExperienceIdAndUser_Id(experienceId, userId.intValue());
        ler.deleteById(lem.getId());
    }

    @Override
    public boolean isLiked(Long experienceId, Long userId) {
        return ler.findByExperience_ExperienceIdAndUser_Id(experienceId, userId.intValue()) != null;
    }



    @Override
    public void deleteLikedExperienceByUser(Long userId) {
        ler.deleteByUser_Id(userId.intValue());
    }

    @Override
    public void deleteLikedExperienceByExperience(Long experienceId) {
          ler.deleteByExperience_ExperienceId(experienceId);
    }
}
