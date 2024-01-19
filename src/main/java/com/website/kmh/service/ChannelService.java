package com.website.kmh.service;

import com.website.kmh.entity.Channel;
import com.website.kmh.repository.ChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChannelService {

    private final ChannelRepository channelRepository;

    @Autowired
    public ChannelService(ChannelRepository channelRepository) {
        this.channelRepository = channelRepository;
    }

    public Channel createChannel(Long channel_id, String channel_name, Long user_id) {
        Channel newChannel = new Channel(channel_id, channel_name, user_id);
        return channelRepository.save(newChannel);
    }

    public List<Channel> findAll() {
        return channelRepository.findAll();
    }
}
