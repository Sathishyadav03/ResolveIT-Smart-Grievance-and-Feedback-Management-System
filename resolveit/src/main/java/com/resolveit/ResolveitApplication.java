package com.resolveit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableScheduling  
public class ResolveitApplication {

    public static void main(String[] args) {
        SpringApplication.run(ResolveitApplication.class, args);
    }

    @Bean
    CommandLineRunner printHash(PasswordEncoder encoder){
        return args -> {
            System.out.println("HASH FOR 123: " + encoder.encode("123"));
        };
    }
}