package com.travelpedia.api.wishlist.service;

import java.util.List;

public interface WishlistService {
    void addWishlist(int userId, long experienceId);
    void removeWishlist(long wishlistId);
    List<Long> findExperienceId(int userId);
}
