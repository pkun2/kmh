package com.website.kmh.provider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import com.website.kmh.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.website.kmh.repository.UserRepository;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    @Lazy
    public CustomAuthenticationProvider(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        // 데이터베이스에서 사용자 조회
        Optional<User> userOptional = userRepository.findByEmail(username);

        try {
            User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("해당하는 이메일을 찾을 수 없습니다."));

            if (passwordEncoder.matches(password, user.getPassword())) {
                // com.website.kmh.domain.User 사용
                return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()); //오류 발생
            } else {
                throw new BadCredentialsException("올바르지 않은 비밀번호");
            }
        } catch (UsernameNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new AuthenticationServiceException("인증 중 오류 발생", e);
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}

