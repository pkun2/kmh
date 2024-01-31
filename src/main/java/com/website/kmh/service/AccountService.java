package com.website.kmh.service;

import com.website.kmh.domain.AccountProfile;
import com.website.kmh.dto.JwtToken;
import com.website.kmh.domain.Account;
import com.website.kmh.dto.UserUpdateRequest;

public interface AccountService {

    Account updateAccount(Long userId, UserUpdateRequest updateRequest);
    JwtToken login(String email, String password);
    AccountProfile getUserProfile(Long userId);

    JwtToken refresh(Long userId);

    Account getUserById(long i);
}
