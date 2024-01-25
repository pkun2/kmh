package com.website.kmh.service;

import com.website.kmh.domain.UserChannel;

import java.util.List;

public interface UserChannelService {
    UserChannel subscribeChannel(Long userId, Long channelId);
    List<String> getSubChannel(Long userId);
}
