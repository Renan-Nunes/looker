package com.example.demo.Domain.Security.Auth;


import com.example.demo.Domain.Security.Config.JwtService;
import com.example.demo.Domain.Security.Model.UserModel;
import com.example.demo.Domain.Security.Repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.Domain.Security.Model.Role;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;


    public AuthenticationService(JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    public AuthenticationResponse register(CreateUserDTO request) {
        var user = new UserModel(null, request.name(), request.password(), request.email(), Role.USER);

        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);

        var response = new AuthenticationResponse(jwtToken);

        return response;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var response = new AuthenticationResponse(jwtToken);
        return response;
    }

}
