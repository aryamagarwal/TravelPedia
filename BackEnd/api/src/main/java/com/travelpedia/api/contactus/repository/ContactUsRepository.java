package com.travelpedia.api.contactus.repository;
//import com.travelpedia.api.UserModel.UserModel;
import com.travelpedia.api.AuthModel.User;
import com.travelpedia.api.contactus.model.ContactusModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactUsRepository extends JpaRepository< ContactusModel, Long> {
List<ContactusModel> getByUser(User user);
    }

