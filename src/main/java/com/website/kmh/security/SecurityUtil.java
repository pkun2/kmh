package com.website.kmh.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    public static String getCurrentUsername() { //현재 토큰의 유저의 역할 가져옴
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("인증된 유저가 아닙니다");
        }
        return authentication.getName();
    }
}
