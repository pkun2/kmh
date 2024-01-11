package com.website.kmh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.website.kmh.domain.User;
import com.website.kmh.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register")
    public Map<String, String> getRegister() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello register");
        return response;
    }
    @GetMapping("/login")
    public Map<String, String> getLogin() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello login");
        return response;
    }

    @PostMapping("/register")
    public void createUser(@RequestBody User request) {
        userService.createUser(
                request.getNickname(),
                request.getEmail(),
                request.getPassword()
        );
    }
}