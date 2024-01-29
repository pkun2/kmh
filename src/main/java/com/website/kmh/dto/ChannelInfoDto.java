package com.website.kmh.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChannelInfoDto {
    private Long channelId;
    private String channelName;
    private boolean isSubscribed;

    public ChannelInfoDto(Long channelId, String channelName) {
        this.channelId = channelId;
        this.channelName = channelName;
    }
}
