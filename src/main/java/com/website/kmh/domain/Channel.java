package com.website.kmh.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "channels", indexes = {
        @Index(columnList = "channel_name", name = "idx_channel_name")
})
public class Channel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="channel_id")
    private Long id;

    @Column(name="channel_name")
    private String name;

    @Column(name="user_id")
    private Long userId;

    @Column(name="subscribers")
    private Long subscribers;

    public Channel(Long id, String name, Long userId, Long subscribers) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.subscribers = subscribers;
    }

    public Channel() {

    }

    public void increaseSubscriberCount() {
        if (subscribers == null) {
            subscribers = 1L;
        } else {
            subscribers++;
        }
    }

    public void decreaseSubscriberCount() {
        if (subscribers == null) {
            subscribers = 1L;
        } else {
            subscribers--;
        }
    }
}

