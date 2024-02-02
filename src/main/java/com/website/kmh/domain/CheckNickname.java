package com.website.kmh.domain;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckNickname {

    @Column(name = "nickname")
    private String nickname;
}
