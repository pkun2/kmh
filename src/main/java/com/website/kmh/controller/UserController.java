package com.website.kmh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.website.kmh.domain.User;
import com.website.kmh.service.UserService;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/register")
    public String getRegister() {
        return "register test";
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