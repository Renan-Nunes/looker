package com.example.demo.Domain.Security.Auth;


import com.example.demo.Domain.Security.Model.Role;

public class AuthenticationRequest {
    private String email;
    private String password;
    private Role role;

    public AuthenticationRequest(String email, Role role, String password) {
        this.email = email;
        this.role  = role;
        this.password  = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
