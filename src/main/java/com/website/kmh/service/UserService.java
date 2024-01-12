package com.website.kmh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.website.kmh.domain.User;
import com.website.kmh.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(String nickname, String email, String password) {
        User newUser = new User();
        newUser.setNickname(nickname);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));

        userRepository.save(newUser);
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        String user_email = user.getEmail();
        String user_password = user.getPassword();

        return org.springframework.security.core.userdetails.User.builder()
                .username(user_email)
                .password(user_password)
                .roles("USER")
                .build();
    }
}
