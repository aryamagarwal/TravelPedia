package com.travelpedia.api.contactus.service;

import com.travelpedia.api.contactus.model.ContactusModel;
import com.travelpedia.api.contactus.repository.ContactUsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ContactusServiceImpl implements ContactusService {
 @Autowired
 ContactUsRepository cr;
    @Override
    public ContactusModel createContactus(ContactusModel contactus) {
        return cr.save(contactus);
    }

}
