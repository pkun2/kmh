package com.website.kmh.controller;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.AccountProfile;
import com.website.kmh.domain.UserChannel;
import com.website.kmh.dto.JwtToken;
import com.website.kmh.dto.LoginDto;
import com.website.kmh.dto.RegisterDto;
import com.website.kmh.dto.UserUpdateRequest;
import com.website.kmh.security.SecurityUtil;
import com.website.kmh.security.jwt.JwtTokenProvider;
import com.website.kmh.service.RegisterService;
import com.website.kmh.service.UserChannelService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.website.kmh.service.AccountService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AccountService accountService;
    private final RegisterService registerService;
    private final UserChannelService userChannelService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(AccountService accountService, RegisterService registerService, UserChannelService userChannelService, JwtTokenProvider jwtTokenProvider) {
        this.accountService = accountService;
        this.registerService = registerService;
        this.userChannelService = userChannelService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/profile")
    public ResponseEntity<AccountProfile> getUserProfile(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        Long userId = jwtTokenProvider.getUserIdFromToken(token);
        AccountProfile accountProfile = accountService.getUserProfile(userId);
        return ResponseEntity.ok(accountProfile);
    }
    @GetMapping("/subscriptions")
    public ResponseEntity<List<String>> getSub(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        Long userId = jwtTokenProvider.getUserIdFromToken(token);
        List<String> subscription = userChannelService.getSubChannel(userId); //channelId를 바탕으로 구독한 채널 가져오기
        return ResponseEntity.ok(subscription);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Account> updateProfile(@PathVariable Long userId, @RequestBody UserUpdateRequest updateRequest) {
        Account updatedUser = accountService.updateAccount(userId, updateRequest);
        return ResponseEntity.ok(updatedUser);
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