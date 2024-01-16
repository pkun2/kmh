package com.website.kmh.controller;

import com.website.kmh.service.JWTService;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.GrantedAuthority;

import com.website.kmh.domain.User;
import com.website.kmh.service.UserService;

import java.text.ParseException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody User request) {
        userService.createUser(
                request.getEmail(),
                request.getNickname(),
                request.getPassword()
        );
    }
    @GetMapping("/login")
    public  void getLogin() {
        return;
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User request) throws ParseException {
        // 클라이언트가 제공한 이메일과 비밀번호 가져오기
        String email = request.getEmail();
        String password = request.getPassword();

        // UsernamePasswordAuthenticationToken을 사용하여 토큰 생성
        Authentication authenticationRequest = new UsernamePasswordAuthenticationToken(email, password);

        try {
            // AuthenticationManager를 통해 직접 인증 수행
            Authentication authenticationResponse = authenticationManager.authenticate(authenticationRequest);

            // 사용자 정보 추출
            User user = (User) authenticationResponse.getPrincipal();

            // 비밀번호 확인
            if (passwordEncoder.matches(password, user.getPassword())) {
                // 인증 성공 시 SecurityContext에 사용자 정보를 설정하고 성공 메시지 반환
                SecurityContextHolder.getContext().setAuthentication(authenticationResponse);
                // JWT 생성
                List<String> authorities = user.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList());
                String jwt = jwtService.generateJwt(request.getEmail(), authorities);
                return ResponseEntity.ok("Login successful. JWT: " + jwt);
            }
        } catch (AuthenticationException e) {
            // 인증 실패 시 적절한 응답 반환
            return ResponseEntity.status(401).body("Login failed: " + e.getMessage());
        }

        // 기타 실패 시 적절한 응답 반환
        return ResponseEntity.status(401).body("Login failed");
    }


}