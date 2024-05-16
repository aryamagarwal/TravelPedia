package com.travelpedia.api.wishlist.controller;

import com.travelpedia.api.wishlist.model.WishlistModel;
import com.travelpedia.api.wishlist.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/permit/wishlist")
public class WishlistController {

         @Autowired
         private WishlistService ws;

         @PostMapping("/add")
         public ResponseEntity<?> addWishlist(@RequestBody WishlistModel wishlistModel) {
             ws.addWishlist(wishlistModel.getUser().getId(), wishlistModel.getExperience().getExperienceId());
             return ResponseEntity.ok().build();
         }

         @DeleteMapping("/remove/{wishlistId}")
         public ResponseEntity<?> removeWishlist(@PathVariable long wishlistId) {
             ws.removeWishlist(wishlistId);
             return ResponseEntity.ok().build();
         }

         @GetMapping("/find/{userId}")
         public ResponseEntity<?> findExperienceId(@PathVariable Long userId) {
             return ResponseEntity.ok(ws.findExperienceId(userId));
         }
}
