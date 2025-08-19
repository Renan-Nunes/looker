package com.example.demo.Domain.Security.Service;


import com.example.demo.Domain.Security.Repository.UserRepository;
import org.springframework.security.web.webauthn.management.UserCredentialRepository;
import org.springframework.stereotype.Service;

@Service
public class userService {
    private UserRepository userRepository;
    private UserCredentialRepository userCredentialRepository;


}
