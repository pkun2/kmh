package com.website.kmh.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity(name = "channels")
public class Channel {

    // channels DB와 그 필드 값 지정
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long channel_id;
    private String channel_name;
    private Long user_id;

    // 생성자 추가
    public Channel(Long channel_id, String channel_name, Long user_id) {
        this.channel_id = channel_id;
        this.channel_name = channel_name;
        this.user_id = user_id;
    }

    public Channel() {

    }
}

