package com.travelpedia.api.UserController;

//package com.example.demo.UserController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.travelpedia.api.UserModel.UserModel;
import com.travelpedia.api.UserRepository.UserRepository;
import com.travelpedia.api.UserService.UsersServiceImpl;



@RestController
public class UserController {
	@Autowired
	UserRepository repo;
	@Autowired
	UsersServiceImpl es;
	
	@CrossOrigin(origins = "http://localhost:5173")
	
	@GetMapping("/users")
	public List<UserModel> getAllUsers(){
		List<UserModel> users=repo.findAll();
		return users;
		
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("users/{id}")
	public UserModel getUser(@PathVariable int id) {
		UserModel users=repo.findById(id).get();
		return users;
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@PostMapping("/users/add")
	@ResponseStatus(code=HttpStatus.CREATED)
	public void createUser(@RequestBody UserModel User) {
		repo.save(User);
		
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@PutMapping("/users/update/{id}")
	public UserModel updateUser(@PathVariable("id") Long id,@RequestBody UserModel user) {
		return es.updateUser(id,user);
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@DeleteMapping("/users/delete/{id}")
	public void deleteTrip(@PathVariable int id) {
		UserModel User=repo.findById(id).get();
		repo.delete(User);
	}


}
