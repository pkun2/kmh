package com.website.kmh.security;

import com.website.kmh.security.jwt.JwtAuthenticationFilter;
import com.website.kmh.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/error").permitAll()
                        .requestMatchers("/api/auth/login").permitAll() // 로그인 경로는 인증없이 호출 가능
                        .requestMatchers("/api/auth/register").permitAll() // 회원가입 경로는 인증없이 호출 가능
                        .requestMatchers("/api/posts/**").permitAll() // /api/posts/latest에 대한 접근을 허용
                        .requestMatchers("/api/auth/test").hasRole("USER")
                        .requestMatchers("/api/posts/create").hasRole("USER") // 게시글 상세 내용도 인증없이
                        .requestMatchers("/api/channel/**").permitAll()
                        .requestMatchers("/api/channel/get").permitAll()
                        .requestMatchers("/api/posts/profile").hasRole("USER")
                        .requestMatchers("/api/auth/refresh").hasRole("USER")
                        .requestMatchers("/api/posts/profile").permitAll() // 프로필 내용을 인증 없이
                        .requestMatchers("/api/auth/refresh").permitAll()
                        .requestMatchers("/api/image/upload").permitAll() // 인증 필요! 임시!
                        .requestMatchers("/api/auth/checkNickname").permitAll()
                        .requestMatchers("/api/auth/email").permitAll()
                        .requestMatchers("/api/auth/emailCode").permitAll()
                        //.requestMatchers("/api/image/upload").permitAll() // 인증 필요! 임시!
                        .requestMatchers("/api/add/comment").hasRole("USER") // 인증 필요!!!!! 댓글 추가 임시
                        .anyRequest().authenticated() // 나머지 경로는 jwt 인증 해야함
                )

                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class).build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt Encoder 사용
        return new BCryptPasswordEncoder();
    }
}

