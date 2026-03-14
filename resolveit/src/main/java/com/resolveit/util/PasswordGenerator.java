package com.resolveit.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String password = "123456";

        String hash = encoder.encode(password);

        System.out.println("BCrypt Password:");
        System.out.println(hash);
    }
}