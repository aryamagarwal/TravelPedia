package com.travelpedia.api.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelpedia.api.UserModel.UserModel;
import com.travelpedia.api.UserRepository.UserRepository;
import com.travelpedia.api.UserService.UserService;

@Service
public class UsersServiceImpl implements UserService {
	
	@Autowired
	 com.travelpedia.api.UserRepository.UserRepository er;
	   
	    @Override
	    public com.travelpedia.api.UserModel.UserModel updateUser(Long id,
				com.travelpedia.api.UserModel.UserModel User) {
	    	 java.util.Optional< com.travelpedia.api.UserModel.UserModel> optionalOldUser = er.findById(id);
	    	if (optionalOldUser.isPresent()) {
	    		com.travelpedia.api.UserModel.UserModel old = optionalOldUser.get();
	            old.setUsername(User.getUsername());
	            old.setFirstname(User.getFirstname());
	            old.setLastname(User.getLastname());
	            old.setEmail(User.getEmail());
	            old.setPassword(User.getPassword());
	            
	            return er.save(old);
	        }
	        return null;
	    }

//		@Override
//		public com.travelpedia.api.UserModel.UserModel updateUser(Long id,
//				com.travelpedia.api.UserModel.UserModel User) {
//			// TODO Auto-generated method stub
//			return null;
//		}

	
}