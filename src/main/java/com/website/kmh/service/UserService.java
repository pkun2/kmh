package com.website.kmh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.website.kmh.repository.UserRepository;
import com.website.kmh.domain.User;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(String nickname, String email) {
        User newUser = new User();
        newUser.setNickname(nickname);
        newUser.setEmail(email);

        userRepository.save(newUser);
    }
}
