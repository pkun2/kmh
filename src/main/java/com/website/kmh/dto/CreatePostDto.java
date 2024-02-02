package com.website.kmh.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePostDto {
    private String title;
    private String content;
    private Integer viewCount;
    private String categoryTag;
    private String channelName;
    private Integer goodCount;
    private Integer badCount;
}
