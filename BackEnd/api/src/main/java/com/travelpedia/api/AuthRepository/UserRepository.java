package com.travelpedia.api.AuthRepository;

//package com.example.travelpediabackendjwt.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
//import com.example.travelpediabackendjwt.models.User;

import com.travelpedia.api.AuthModel.User;


public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);

  Optional<User> findById(Long id);
  
  Optional<User> findByUserName(String username);

  Optional<User> findByVerificationToken(String token);

  @Query("select t from User t where t.email = :userNameOrEmail OR t.userName = :userNameOrEmail")
  Optional<User> findByUserNameOrEmail(
          @Param("userNameOrEmail") String userNameOrEmail);

  // Spring Data Rest
//  Optional<User> findByUserNameOrEmail(
//          @Param("usernameOrEmail") String userName,
//          @Param("usernameOrEmail") String email);

  Boolean existsByUserNameOrEmail(
          @Param("usernameOrEmail") String username,
          @Param("usernameOrEmail") String email);

  Boolean existsByUserName(String username);
  
  Boolean existsByEmail(String email);
}
