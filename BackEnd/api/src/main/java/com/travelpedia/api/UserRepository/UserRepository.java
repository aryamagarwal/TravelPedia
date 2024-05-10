package com.travelpedia.api.UserRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelpedia.api.UserModel.UserModel;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends  JpaRepository<UserModel,Integer>{

	Optional<UserModel> findById(Long id);
	@Query(value = "SELECT u FROM UserModel u WHERE u.id = ?1")
     UserModel findByUserId(Long id);
}