package com.website.kmh.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "usermapping")
public class UserChannel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mapping_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "channel_id")
    private Channel channel;

    private LocalDate joinDate;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        MODERATOR, EDITOR, USER
    }
}
