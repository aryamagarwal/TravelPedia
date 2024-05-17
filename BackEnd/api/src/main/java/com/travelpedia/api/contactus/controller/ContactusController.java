package com.travelpedia.api.contactus.controller;

import com.travelpedia.api.AuthModel.User;
//import com.travelpedia.api.UserModel.UserModel;
//import com.travelpedia.api.UserRepository.UserRepository;
import com.travelpedia.api.AuthRepository.UserRepository;
import com.travelpedia.api.contactus.model.RequestModel;
import com.travelpedia.api.contactus.service.ContactusService;
import com.travelpedia.api.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import com.travelpedia.api.contactus.model.ContactusModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permit/contactus")
@CrossOrigin(origins = "*")
public class ContactusController {
    @Autowired
    ContactusService cs;
    @Autowired
    UserRepository ur;
//    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/create")
    public ContactusModel createContactus(@RequestBody RequestModel contactus ,@RequestParam("userId") Long userId )
    {
        User um = ur.findById(userId).get();
        ContactusModel cm = new ContactusModel();
//        cm.setCity(contactus.getCity());
        cm.setName(contactus.getName());

        cm.setUser(um);
        cm.setEmail(contactus.getEmail());
        cm.setQuery(contactus.getQuery());
//        cm.setWhatsApp(contactus.getWhatsApp());
        return cs.createContactus(cm);
    }
    @GetMapping("/get")
    public List<ContactusModel> getTickets(@RequestParam("userId") String userId)
    {
        return cs.getTickets(Long.parseLong(userId));
    }

}
