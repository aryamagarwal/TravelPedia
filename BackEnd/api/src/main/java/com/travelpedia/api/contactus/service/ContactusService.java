package com.travelpedia.api.contactus.service;
import com.travelpedia.api.contactus.model.ContactusModel;

import java.util.List;
public interface ContactusService {

public ContactusModel createContactus(ContactusModel contactus);


    List<ContactusModel> getTickets( Long userId);
}