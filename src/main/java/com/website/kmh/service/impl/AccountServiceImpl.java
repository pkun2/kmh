package com.website.kmh.service.impl;

import com.website.kmh.domain.AccountProfile;
import com.website.kmh.dto.JwtToken;
import com.website.kmh.domain.Account;
import com.website.kmh.dto.UserUpdateRequest;
import com.website.kmh.repository.AccountRepository;
import com.website.kmh.security.jwt.JwtTokenProvider;
import com.website.kmh.service.AccountService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public JwtToken login(String email, String password) { //로그인
        // 1. username을 기반으로 저장된 Account를 찾음
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        // 2. 저장된 비밀번호와 입력된 비밀번호를 비교
        if (!passwordEncoder.matches(password, account.getPassword())) {
            throw new BadCredentialsException("잘못된 비밀번호 입니다.");
        }
        // 3. Authentication 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, account.getPassword() );

        // 4. 실제 검증. authenticate() 메서드를 통해 요청된 Member 에 대한 검증 진행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 5. 인증 정보를 기반으로 JWT 토큰 생성
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

        // 6. JWT 토큰을 클라이언트에게 전달
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + jwtToken.getAccessToken());

        return jwtToken;
    }

    @Transactional
    public JwtToken refresh(Long userId) { //토큰 재발급
        // 1. username을 기반으로 저장된 Account를 찾음
        Account account = accountRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with uid: " + userId));

        String email = account.getUsername(); // 이메일

        // 3. Authentication 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, account.getPassword() );

        // 4. 실제 검증. authenticate() 메서드를 통해 요청된 Member 에 대한 검증 진행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 5. 인증 정보를 기반으로 JWT 토큰 생성
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

        // 6. JWT 토큰을 클라이언트에게 전달
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + jwtToken.getAccessToken());

        return jwtToken;
    }

    public Account getUserById(long id) { //uid 바탕으로 계정 가져오기
        Optional<Account> userOptional = accountRepository.findById(id);

        // ID에 해당하는 사용자가 없는 경우, 예외를 발생시킵니다.
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with id: " + id);
        }

        // ID에 해당하는 사용자를 반환합니다.
        return userOptional.get();
    }

    public  Account updateAccount(Long userId, UserUpdateRequest updateRequest) { //해당 유저id를 바탕으로 유저의 이메일과 닉네임을 변경
        Account account = accountRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException(("해당 계정을 찾을 수 없습니다.")));

        account.setEmail(updateRequest.getEmail());
        account.setNickname(updateRequest.getNickname());

        return accountRepository.save(account);
    }

    @Override
    public AccountProfile getUserProfile(Long userId) { // userId를 바탕으로 유저의 프로필 가져옴
        // 유저 정보 조회 로직
        Account account = accountRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // AccountProfile 객체 생성 및 반환
        return new AccountProfile(account);
    }
}
