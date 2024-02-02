package com.website.kmh.service;

import com.website.kmh.domain.AccountProfile;
import com.website.kmh.dto.JwtToken;
import com.website.kmh.domain.Account;
import com.website.kmh.dto.UserUpdateRequest;

public interface AccountService {

    Account updateAccount(Long userId, UserUpdateRequest updateRequest); //프로필 변경

    JwtToken login(String email, String password); // 로그인진행후 토큰 발급

    AccountProfile getUserProfile(Long userId); // 프로필 가져오기

    JwtToken refresh(Long userId); // 토큰 재발급

    Account getUserById(long id); //유저로 부터 id가져오기

    boolean isNicknameAvailable(String nickname); // 닉네임 중복검사

    boolean isEmailAvailable(String email);
}
