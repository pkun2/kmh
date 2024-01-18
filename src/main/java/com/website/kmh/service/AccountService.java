package com.website.kmh.service;

import com.website.kmh.dto.JwtToken;

public interface AccountService {
    JwtToken login(String email, String password);
}
