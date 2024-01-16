package com.website.kmh.service;

import org.springframework.security.core.Authentication;

import java.text.ParseException;
import java.util.List;

public interface JWTService {
    String generateJwt(String username, List<String> authorities) throws ParseException;
    Authentication validateJwt(String jwt);
}
