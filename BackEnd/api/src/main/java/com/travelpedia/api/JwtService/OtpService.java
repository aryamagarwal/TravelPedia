package com.travelpedia.api.JwtService;

//package com.example.travelpediabackendjwt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
//import com.example.travelpediabackendjwt.models.User;
//import com.example.travelpediabackendjwt.repositories.UserRepository;

import com.travelpedia.api.JwtModel.User;
import com.travelpedia.api.JwtRepository.UserRepository;

import lombok.AllArgsConstructor;

import java.text.DecimalFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Service
@AllArgsConstructor
public class OtpService {
    @Autowired
    private EmailService es;
    @Autowired
    private UserRepository userRepo;

    private String generateRandomOtp() {
        return new DecimalFormat("000000")
                .format(new Random().nextInt(999999));
    }
    @Async
    public Boolean sendOTP(User user) {
        String otp = generateRandomOtp();
        user.setVerificationToken(otp);
        user.setTokenExpiryTime(Instant.now().plus(5, ChronoUnit.MINUTES));
        userRepo.save(user);
        return es.sendOtpVerificationEmail(user.getEmail(), user.getUsername(), otp);
    }

    public Object[] validateOTP(User user, String otp) {
        var status = false;
        var msg = "";
        if(Instant.now().isAfter(user.getTokenExpiryTime())) {
            msg = "OTP Expired!";
//                otpService.sendOTP(user);
        }
        else if(!otp.equals(user.getVerificationToken())) {
            msg = "Invalid OTP !!";
        } else {
            user.setIsVerified(Boolean.TRUE);
            userRepo.save(user);
            msg = "OTP Verification Successful";
            status = true;
        }

        return new Object[]{msg, status};
    }

}
