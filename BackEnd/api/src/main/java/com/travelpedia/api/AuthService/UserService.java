package com.travelpedia.api.AuthService;

//package com.example.travelpediabackendjwt.services;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
//
//import com.example.travelpediabackendjwt.dto.JwtAuthenticationResponse;
//import com.example.travelpediabackendjwt.dto.PasswordChangeRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
//
//import com.example.travelpediabackendjwt.models.User;
//import com.example.travelpediabackendjwt.repositories.UserRepository;

import com.travelpedia.api.AuthDto.JwtAuthenticationResponse;
import com.travelpedia.api.AuthDto.PasswordChangeRequest;
import com.travelpedia.api.AuthModel.User;
import com.travelpedia.api.AuthRepository.UserRepository;

//import com.travelpedia.api.UserRepository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService {
    @Value("${user.image.location}")
    private String location;

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepo;
    private final JwtService jwtService;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String userName) {
              return userRepo.findByUserName(userName)
                      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    public User save(User newUser) {
        if (newUser.getId() == null) {
            newUser.setCreatedAt(Instant.now());
            newUser.setIsVerified(false);
            //		  TODO add sendVerificationMail here
            //		  sendVerificationEmail(newUser);
        }
        newUser.setUpdatedAt(Instant.now());
        return userRepo.save(newUser);
    }

    public User updateUser(Long id,User User) {
        java.util.Optional< User> optionalOldUser = userRepo.findById(id);
        if (optionalOldUser.isPresent()) {
            User old = optionalOldUser.get();
            old.setUserName(User.getUsername());
            old.setFirstName(User.getFirstName());
            old.setLastName(User.getLastName());
            old.setEmail(User.getEmail());
            old.setPassword(User.getPassword());

            return save(old);
        }
        return null;
    }

    public JwtAuthenticationResponse updatePassword(PasswordChangeRequest req, User user) {
        var jwt = "";
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user = save(user);
        jwt = jwtService.generateToken(user);

        return JwtAuthenticationResponse.builder().token(jwt).status(false).build();
    }
  
    public Boolean checkUser(String username) {
        return userRepo.existsByUserName(username);
    }
    public Boolean checkEmail(String email) {
        return  userRepo.existsByEmail(email);
    }

    public String uploadFile(MultipartFile file, String title) {
        if (file.isEmpty())
            return "File is empty";
        //check if location directory exists or not
        Path path = Paths.get(location);
        if (!path.toFile().exists())
            try {
                Files.createDirectories(path);
            } catch (Exception e) {
                return "Error in creating directory";
            }
        try(InputStream is = file.getInputStream()){
            Path filePath = Paths.get(location + "\\" + title);
            Files.copy(is, filePath , StandardCopyOption.REPLACE_EXISTING);
        }
        catch (Exception e){
            return "Error in uploading file";
        }
        return "file uploaded successfully";
    }


//    @Override
    public byte[] downloadFile(String fileName) {
        try {
            Path path = Paths.get(location + "\\" + fileName);
            return Files.readAllBytes(path);
        }
        catch (Exception e){
            return new byte[0];
        }

    }

//    @Override
    public void deleteFile(String fileName) {
        try {
            Path path = Paths.get(location + "\\" + fileName);
            Files.deleteIfExists(path);
        }
        catch (Exception e){
            System.out.println("Error in deleting file");
        }
    }
}
