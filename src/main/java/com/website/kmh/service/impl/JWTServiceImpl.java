package com.website.kmh.service.impl;

import com.website.kmh.service.JWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JWTServiceImpl implements JWTService {

    private final String key = "Z2FzaGZnaHh6Z2NhcXcvQXNnZkFkamFzaGYK";
    private final SecretKey secretKey = Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));

    @Override
    public String generateJwt(String username, List<String> authorities) {
        Date date = new Date();
        return Jwts.builder()
                .setIssuer("")
                .setSubject("JWT Auth Token")
                .claim("username", username)
                .claim("authorities", authorities)
                .setIssuedAt(date)
                .setExpiration(new Date(date.getTime() + 60000))
                .signWith(secretKey)
                .compact();
    }

    @Override
    public Authentication validateJwt(String jwt) {
        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(jwt);

        Claims body = claimsJws.getBody();
        String username = body.get("username", String.class);

        List<String> authorities = body.get("authorities", List.class);

        // GrantedAuthority로 변환
        List<GrantedAuthority> grantedAuthorities = authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        // UserDetails를 생성하여 Authentication 객체 반환
        UserDetails userDetails = new User(username, "", grantedAuthorities);
        return new UsernamePasswordAuthenticationToken(userDetails, "", grantedAuthorities);
    }

}
