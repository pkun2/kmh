package com.website.kmh.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long comment_id;
    private Long userId;
    private Long postId;
    private String content;
    private String nickname;
    private LocalDateTime time;
    private Long double_comment;

    // Getters and Setters
    public Long getId() {
        return comment_id;
    }

    public void setId(Long id) {
        this.comment_id = id;
    }

    // Getter and Setter for userId
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getter and Setter for postId
    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    // Getter and Setter for content
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Getter and Setter for nickname
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public long getDouble_Comment() {
        return double_comment;
    }

    public void setDouble_comment(Long double_comment) {
        this.double_comment = double_comment;
    }

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