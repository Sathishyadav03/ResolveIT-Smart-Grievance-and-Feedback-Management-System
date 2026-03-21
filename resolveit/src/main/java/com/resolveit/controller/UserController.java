package com.resolveit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.resolveit.model.User;
import com.resolveit.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /* GET ALL STAFF */

    @GetMapping("/staff")
    public List<User> getAllStaff(){
        return userService.getAllStaff();
    }

    /* ✅ ADD NEW STAFF */

    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.saveUser(user);
    }

}