package com.resolveit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.resolveit.model.User;
import com.resolveit.service.UserService;
import com.resolveit.util.JwtUtil;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    /* REGISTER */

    @PostMapping("/register")
    public User register(@RequestBody User user){

        user.setRole("CUSTOMER");

        return userService.register(user);
    }

    /* LOGIN */

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody User loginRequest){

        User user = userService.login(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        String token = jwtUtil.generateToken(
                user.getId(),
                user.getRole()
        );

        return Map.of(
                "token",token,
                "role",user.getRole()
        );
    }

}