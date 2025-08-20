package com.example.demo.Domain.Security.Auth;


import com.example.demo.Domain.Security.Config.JwtService;
import com.example.demo.Domain.Security.Dto.CreateUserDTO;
import com.example.demo.Domain.Security.Model.UserModel;
import com.example.demo.Domain.Security.Repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import com.example.demo.Domain.Security.Model.Role;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(JwtService jwtService, AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        UserModel user = new UserModel(request.getPassword(), request.getEmail(), request.getRole());
        return new AuthenticationResponse(jwtService.generateToken(user));
    }

}
