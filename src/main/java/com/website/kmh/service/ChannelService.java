package com.website.kmh.service;

import com.website.kmh.repository.ChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChannelService {

    private final ChannelRepository channelRepository;

    @Autowired
    public ChannelService(ChannelRepository channelRepository) {
        this.channelRepository = channelRepository;
    }


}
