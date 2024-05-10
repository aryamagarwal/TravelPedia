package com.travelpedia.api.wishlist.service;

import com.travelpedia.api.UserModel.UserModel;
import com.travelpedia.api.UserRepository.UserRepository;
import com.travelpedia.api.experiences.model.ExperienceModel;
import com.travelpedia.api.experiences.repository.ExperienceRepository;
import com.travelpedia.api.wishlist.model.WishlistModel;
import com.travelpedia.api.wishlist.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistServiceImpl implements WishlistService {
    @Autowired
    WishlistRepository wr;
    @Autowired
    UserRepository ur;
    @Autowired
    ExperienceRepository er;
    @Override
    public void addWishlist(int userId, long experienceId) {
        UserModel user=ur.findById(userId).orElseThrow();
        ExperienceModel experience=er.findByExperienceId(experienceId);
        WishlistModel wishlist=new WishlistModel();
        wishlist.setUser(user);
        wishlist.setExperience(experience);
        wr.save(wishlist);
    }

    @Override
    public void removeWishlist(long wishlistId) {
      wr.deleteById(wishlistId);
    }

    @Override
    public List<Long> findExperienceId(int userId) {
        return wr.findLikedExperienceId(userId);
    }
}
