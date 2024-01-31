package com.website.kmh.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long comment_id;
    // Getter and Setter for userId

    private Long userId;
    private Long postId;
    private String content;
    private String nickname;
    private LocalDateTime time;
    private Long double_comment;

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + comment_id +
                ", userId=" + userId +
                ", postId=" + postId +
                ", content='" + content + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }
}