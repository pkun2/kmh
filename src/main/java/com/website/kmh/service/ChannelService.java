package com.website.kmh.service;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.Channel;
import com.website.kmh.repository.ChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChannelService {

    private final ChannelRepository channelRepository;

    @Autowired
    public ChannelService(ChannelRepository channelRepository) {
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

        // 찾은 채널을 반환. 채널이 존재하지 않는 경우, 예외를 발생.
        return channel.orElseThrow(() -> new RuntimeException("Channel not found with id: " + channelId));
    }
}
