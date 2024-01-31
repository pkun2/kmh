package com.website.kmh.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
public class PostDto {
    private Long id;
    private Long userId;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Integer viewCount;
    private String categoryTag;
    private Long channelId;
    private String channelName;
    private Integer goodCount;
    private Integer badCount;
}
