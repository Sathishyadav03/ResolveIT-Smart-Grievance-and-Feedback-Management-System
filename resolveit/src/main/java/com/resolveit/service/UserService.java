
package com.resolveit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.resolveit.model.User;
import com.resolveit.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Service
@RequiredArgsConstructor

public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /* REGISTER USER */

    public User register(User user) {

        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if(user.getRole() == null){
            user.setRole("CUSTOMER");
        }

        return userRepository.save(user);
    }

    /* LOGIN USER */

    public User login(String email,String password){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(password,user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    /* GET ALL STAFF */

    public List<User> getAllStaff(){

        return userRepository.findByRole("STAFF");

    }

    /* GET ALL USERS (optional admin feature) */

    public List<User> getAllUsers(){

        return userRepository.findAll();

    }
   public User saveUser(User user){
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
}
}


