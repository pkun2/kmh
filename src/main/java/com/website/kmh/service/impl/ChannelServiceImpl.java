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

    public Channel createChannel(String channel_name, Long user_id) { // 채널 만들기
        Channel newChannel = new Channel(null, channel_name, user_id, 0L);
        return channelRepository.save(newChannel);
    }

    public List<Channel> findAll() { // 전체 검색
        return channelRepository.findAll();
    }

    public Channel getChannelById(long channelId) { // 채널 가져오기
        Optional<Channel> channel = channelRepository.findById(channelId);
        // ID에 해당하는 사용자를 반환.
        return channel.orElseThrow(() -> new RuntimeException("Channel not found with id: " + channelId));
    }

    public Channel findChannelByName(String channelName) {
        return channelRepository.findChannelByName(channelName);
    }

    public List<Channel> getPopularChannels() {
        return channelRepository.findTop10ByOrderBySubscribersDesc();
    }

    public Channel getChannelByName(String channleName) {
        Optional<Channel> channel = channelRepository.findByName(channleName);
        // 이름에 해당하는 사용자를 반환.
        return channel.orElseThrow(() -> new RuntimeException("Channel not found with id: " + channleName));
    }
}
