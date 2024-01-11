package com.website.kmh.domain;

import jakarta.persistence.*;

@Entity(name = "channels")
public class Channel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long channel_id;

    private String channel_name;

    private Long user_id;

    // getters and setters
}

