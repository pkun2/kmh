package com.website.kmh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.website.kmh.domain.User;
import com.website.kmh.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(UserService userService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }
    @PostMapping("/register")
    public void registerUser(@RequestBody User request) {
        userService.createUser(
                request.getNickname(),
                request.getEmail(),
                request.getPassword()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User request) {
        // 클라이언트가 제공한 이메일과 비밀번호 가져오기
        String email = request.getEmail();
        String password = request.getPassword();

        // UserDetailsService를 통해 UserDetails 객체 가져오기
        UserDetails userDetails = userService.loadUserByUsername(email);

        // UserDetailsService에서 가져온 UserDetails의 비밀번호와 클라이언트 제공 비밀번호 비교
        if (passwordEncoder.matches(password, userDetails.getPassword())) {
            // 인증 성공 시 SecurityContext에 사용자 정보를 설정하고 성공 메시지 반환
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication = authenticationManager.authenticate(authentication);

            if (authentication.isAuthenticated()) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
                return ResponseEntity.ok("Login successful");
            }
        }

        // 인증 실패 시 적절한 응답 반환
        return ResponseEntity.status(401).body("Login failed");
    }
}