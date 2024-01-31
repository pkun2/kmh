package com.website.kmh.service.impl;

import com.website.kmh.domain.Channel;
import com.website.kmh.repository.ChannelRepository;
import com.website.kmh.service.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChannelServiceImpl implements ChannelService {
    private final ChannelRepository channelRepository;

    @Autowired
    public ChannelServiceImpl(ChannelRepository channelRepository) {
        this.channelRepository = channelRepository;
    }

    public Channel createChannel(String channel_name, Long user_id) {
        Channel newChannel = new Channel(null, channel_name, user_id);
        return channelRepository.save(newChannel);
    }

    public List<Channel> findAll() {
        return channelRepository.findAll();
    }

    public Channel getChannelById(long channelId) {
        Optional<Channel> channel = channelRepository.findById(channelId);
        // ID에 해당하는 사용자를 반환합니다.
        return channel.orElseThrow(() -> new RuntimeException("Channel not found with id: " + channelId));
    }
}
