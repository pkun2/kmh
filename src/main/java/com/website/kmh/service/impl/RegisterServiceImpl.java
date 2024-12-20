package com.website.kmh.service.impl;

import com.website.kmh.dto.RegisterDto;
import com.website.kmh.domain.Account;
import com.website.kmh.repository.AccountRepository;
import com.website.kmh.service.RegisterService;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@Transactional
@Slf4j
public class RegisterServiceImpl implements RegisterService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterServiceImpl(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public void register(RegisterDto registerDto) { //회원 가입
        try {
            if (accountRepository.existsByEmail(registerDto.getEmail())) {
                throw new RuntimeException("이미 사용중인 아이디입니다.");
            }

            log.info("Account: {}", registerDto);

            //암호화 진행
            String encodedPassword = passwordEncoder.encode(registerDto.getPassword());

            Account account = Account.builder()
                    .email(registerDto.getEmail())
                    .nickname(registerDto.getNickname())
                    .password(encodedPassword)
                    .roles(Arrays.asList("USER"))
                    .build();

            accountRepository.save(account);

            log.info("Account saved: {}", account);
        } catch (Exception e) {
            log.error("Error while saving account", e);
            throw e; // 예외를 다시 던져서 롤백되도록 함
        }
    }
}
