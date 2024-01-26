package com.website.kmh.service;

import com.website.kmh.domain.UserChannel;
import com.website.kmh.dto.ChannelInfoDto;

import java.util.List;

public interface UserChannelService {

//    List<ChannelInfoDto> getSubChannel(Long userId);
    UserChannel subscribeChannel(Long userId, Long channelId);
    List<String> getProfileSubChannel(Long userId);

    // 사용자가 구독한 채널 ID 목록을 가져오는 메소드
    List<Long> getSubscribedChannelIds(Long userId);

    void CancelSubChannel(Long userId, Long channelId);
}
