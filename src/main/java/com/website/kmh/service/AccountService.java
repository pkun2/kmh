package com.website.kmh.service;

import com.website.kmh.dto.JwtToken;
import com.website.kmh.domain.Account;

public interface AccountService {
    JwtToken login(String email, String password);

    Account getUserById(long i);
}
