package com.website.kmh.controller;

import com.website.kmh.dto.JwtToken;
import com.website.kmh.dto.LoginDto;
import com.website.kmh.dto.RegisterDto;
import com.website.kmh.security.SecurityUtil;
import com.website.kmh.service.RegisterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.website.kmh.service.AccountService;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AccountService accountService;
    private final RegisterService registerService;

    public AuthController(AccountService accountService, RegisterService registerService) {
        this.accountService = accountService;
        this.registerService = registerService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        try {
            registerService.register(registerDto);
            log.info("회원가입 정보: {}", registerDto);
            return ResponseEntity.ok("회원가입이 완료되었습니다.");
        } catch (DuplicateKeyException e) {
            return ResponseEntity.badRequest().body("이미 사용중인 아이디입니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("회원가입 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/login")
    public JwtToken login(@RequestBody LoginDto loginDto) {
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();
        JwtToken jwtToken = accountService.login(email, password);
        log.info("request username = {}, password = {}", email, password);
        log.info("jwtToken accessToken = {}, refreshToken = {}", jwtToken.getAccessToken(), jwtToken.getRefreshToken());
        return jwtToken;
    }

    @PostMapping("/test")
    public String test() {
        return SecurityUtil.getCurrentUsername();
    }
}