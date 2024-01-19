package com.website.kmh.service;

import com.website.kmh.dto.JwtToken;
import com.website.kmh.domain.Account;

public interface AccountService {
    Account getUserById(long id);
    JwtToken login(String email, String password);
}
