package com.website.kmh.service;

import com.website.kmh.domain.Channel;

import java.util.List;

public interface ChannelService {
    Channel createChannel(String channel_name, Long user_id);

    List<Channel> findAll();

    Channel getChannelById(long channelId);
}
