package com.website.kmh.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDto {
    private String nickname;
    private String content;
    private Long double_comment;
    private LocalDateTime time;
    private Long userId;

    public CommentDto(String nickname, String content, Long doubleComment, LocalDateTime time, Long userId) {
        this.nickname = nickname;
        this.content = content;
        this.double_comment = doubleComment;
        this.time = time;
        this.userId = userId;
    }
}
