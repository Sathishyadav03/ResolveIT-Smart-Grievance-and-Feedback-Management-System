package com.resolveit.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.resolveit.repository.UserRepository;
import com.resolveit.model.User;

@Service
@RequiredArgsConstructor
public class UserService {

private final UserRepository userRepository;

public User register(User user) {

if(user.getRole() == null){
user.setRole("CUSTOMER");
}

return userRepository.save(user);
}

public User login(String email, String password) {

User user = userRepository.findByEmail(email)
.orElseThrow(() -> new RuntimeException("User not found"));

if(!user.getPassword().equals(password)){
throw new RuntimeException("Invalid password");
}

return user;
}
}