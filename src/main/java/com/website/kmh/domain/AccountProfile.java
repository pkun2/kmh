package com.website.kmh.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccountProfile {
    private Long id;
    private String email;
    private String nickname;

    public  AccountProfile(Account account) {
        this.id = account.getId();
        this.email = account.getEmail();
        this.nickname = account.getNickname();
    }
}
