package com.website.kmh.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity(name = "channels")
public class Channel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="channel_id")
    private Long id;

    @Column(name="channel_name")
    private String name;

    @Column(name="user_id")
    private Long userId;

    public Channel(Long id, String name, Long userId) {
        this.id = id;
        this.name = name;
        this.userId = userId;
    }

    public Channel() {

    }
}

