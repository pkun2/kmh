package com.website.kmh.controller;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.AccountProfile;
import com.website.kmh.domain.UserChannel;
import com.website.kmh.dto.*;
import com.website.kmh.security.SecurityUtil;
import com.website.kmh.security.jwt.JwtTokenProvider;
import com.website.kmh.service.RegisterService;
import jakarta.servlet.http.HttpServletRequest;
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
    @GetMapping("/profile/user") //내프로필에 아이디, 닉네임, 이메일이 보임
    public ResponseEntity<AccountProfile> getUserProfile(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        Long userId = jwtTokenProvider.getUserIdFromToken(token); // 액세스 토큰으로 부터 유저 id를 가져옴
        AccountProfile accountProfile = accountService.getUserProfile(userId); // 유저 id를 바탕으로 프로필 정보를 가져옴
        return ResponseEntity.ok(accountProfile);
    }

    @GetMapping("/profile/subscribed") //내 프로필에 구독한 채널 항목을 리스트로 띄워줌
    public ResponseEntity<List<String>> getProfileSub(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        Long userId = jwtTokenProvider.getUserIdFromToken(token);
        List<String> subscribedChannelNames  = userChannelService.getProfileSubChannel(userId); //channelId를 바탕으로 구독한 채널 가져오기
        return ResponseEntity.ok(subscribedChannelNames);
    }


    @PutMapping("/{userId}")
    public ResponseEntity<Account> updateProfile(@PathVariable Long userId, @RequestBody UserUpdateRequest updateRequest) {
        Account updatedUser = accountService.updateAccount(userId, updateRequest); //
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/register") //회원가입
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        try {
            registerService.register(registerDto); //회원 가입요청
            return ResponseEntity.ok("회원가입이 완료되었습니다.");
        } catch (DuplicateKeyException e) {// 이미 사용중인 이메일인 경우
            return ResponseEntity.badRequest().body("이미 사용중인 이메일입니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("회원가입 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/login") //로그인
    public JwtToken login(@RequestBody LoginDto loginDto) {
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();
        JwtToken jwtToken = accountService.login(email, password); // 로그인 진행후 jwt 토큰을 access 토큰과 refresh 토큰 반환

        return jwtToken;
    }

    @PostMapping("/refresh") //토큰 재발급
    public JwtToken refresh(HttpServletRequest request) {
        String currentToken = request.getHeader("Authorization").substring(7); //헤더의 정의된 jwt토큰으로 부터 access토큰을 가져옴
        Long userId = jwtTokenProvider.getUserIdFromToken(currentToken); //해당 access토큰으로 부터 userId를 가져옴
        return accountService.refresh(userId); //토큰 재발급 진행
    }

    @PostMapping("/test")
    public String test() {
        return SecurityUtil.getCurrentUsername();
    }
}