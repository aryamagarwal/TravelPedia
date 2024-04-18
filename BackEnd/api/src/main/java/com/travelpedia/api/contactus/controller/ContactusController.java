package com.travelpedia.api.contactus.controller;
import com.travelpedia.api.contactus.model.ContactusModel;
import com.travelpedia.api.contactus.service.ContactusService;
import com.travelpedia.api.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contactus")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactusController {
    @Autowired
    ContactusService cs;
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/create")
    public ContactusModel createContactus(@RequestBody ContactusModel contactus)
    {
        return cs.createContactus(contactus);
    }


}
