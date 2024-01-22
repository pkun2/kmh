package com.website.kmh.service;

import com.website.kmh.dto.JwtToken;
import com.website.kmh.domain.Account;
import com.website.kmh.dto.UserUpdateRequest;

public interface AccountService {
    Account getUserById(long id);

    Account updateAccount(Long userId, UserUpdateRequest updateRequest);
    JwtToken login(String email, String password);
}
