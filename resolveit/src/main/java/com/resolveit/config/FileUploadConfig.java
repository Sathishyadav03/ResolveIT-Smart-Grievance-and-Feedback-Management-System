package com.resolveit.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.context.annotation.Bean;

@Configuration
public class FileUploadConfig {

@Bean
public MultipartResolver multipartResolver(){
return new StandardServletMultipartResolver();
}

}