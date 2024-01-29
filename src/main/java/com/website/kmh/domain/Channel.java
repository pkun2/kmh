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
    @Column(name="channel_id")
    private Long id;

    @Column(name="channel_name")
    private String name;

    @Column(name="user_id")
    private Long userId;

    // 생성자 추가
    public Channel(Long id, String name, Long userId) {
        this.id = id;
        this.name = name;
        this.userId = userId;
    }

    public Channel() {

    }
}

