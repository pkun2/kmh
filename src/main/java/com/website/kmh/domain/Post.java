package com.website.kmh.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "posts", indexes = {
        @Index(columnList = "channel_id", name = "idx_channel_id"),
        @Index(columnList = "created_at", name = "idx_created_at"),
        @Index(columnList = "user_id", name = "idx_author_id")
})
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Account user;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt;

    @Column(name = "view_count", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int viewCount = 0;

    @Column(name = "category_tag")
    private String categoryTag;

    @ManyToOne
    @JoinColumn(name = "channel_id", nullable = false)
    private Channel channel;

    @Column(name = "good_count", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int goodCount;

    @Column(name = "bad_count", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int badCount;
}