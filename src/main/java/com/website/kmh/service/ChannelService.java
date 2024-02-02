package com.website.kmh.service;

import com.website.kmh.domain.Channel;

import java.util.List;

public interface ChannelService {
    Channel createChannel(String channel_name, Long user_id); // 채널만들기

    List<Channel> findAll(); // 전체 채널 불러오기

    Channel getChannelById(long channelId); // id를 바탕으로 채널 가져오기

    Channel findChannelByName(String channelName); // 특정 채널의 구독 여부만 불러오기

    Channel getChannelByName(String channleName);

    List<Channel> getPopularChannels();
}
