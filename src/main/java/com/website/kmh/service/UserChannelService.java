package com.website.kmh.service;

import com.website.kmh.domain.UserChannel;
import com.website.kmh.dto.ChannelInfoDto;

import java.util.List;
import java.util.Map;

public interface UserChannelService {
    UserChannel subscribeChannel(Long userId, Long channelId); // 채널 구독
    List<String> getProfileSubChannel(Long userId); // 프로필의 구독중인 채널목록

    List<Long> getSubscribedChannelIds(Long userId); // 구독중인 채널목록 표시

    void CancelSubChannel(Long userId, Long channelId); // 채널 구독취소

    Map<Long, String> getProfileSubChannelMap(Long userId); // 구독중인 채널 헤더에
}
