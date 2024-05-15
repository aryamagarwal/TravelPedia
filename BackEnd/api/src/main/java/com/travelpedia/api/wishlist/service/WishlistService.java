package com.travelpedia.api.wishlist.service;

import java.util.List;

public interface WishlistService {
    void addWishlist(Long userId, Long experienceId);
    void removeWishlist(Long wishlistId);
    List<Long> findExperienceId(Long userId);
}
