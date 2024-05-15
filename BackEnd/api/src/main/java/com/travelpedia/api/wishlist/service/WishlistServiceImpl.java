package com.travelpedia.api.wishlist.service;

import com.travelpedia.api.JwtModel.User;
import com.travelpedia.api.JwtRepository.UserRepository;
//
//import com.travelpedia.api.UserModel.UserModel;
//import com.travelpedia.api.UserRepository.UserRepository;
import com.travelpedia.api.experiences.model.ExperienceModel;
import com.travelpedia.api.experiences.repository.ExperienceRepository;
import com.travelpedia.api.wishlist.model.WishlistModel;
import com.travelpedia.api.wishlist.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
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
    public void addWishlist(Long userId, Long experienceId) {
        User user=ur.findById(userId).orElseThrow();
        ExperienceModel experience=er.findByExperienceId(experienceId);
        WishlistModel wishlist=new WishlistModel();
        wishlist.setUser(user);
        wishlist.setExperience(experience);
        wr.save(wishlist);
    }

    @Override
    public void removeWishlist(Long wishlistId) {
      wr.deleteById(wishlistId);
    }

    @Override
    public List<Long> findExperienceId(Long userId) {
        return wr.findLikedExperienceId(userId);
    }
}
