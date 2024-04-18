package com.travelpedia.api.contactus.repository;
import com.travelpedia.api.contactus.model.ContactusModel;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ContactUsRepository extends JpaRepository< ContactusModel, Long> {

    }

