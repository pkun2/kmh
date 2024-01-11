package com.website.kmh.controller;

import com.website.kmh.domain.Channel;
import com.website.kmh.repository.ChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class ChannelController {

    private final ChannelRepository channelRepository;

    @Autowired
    public ChannelController(ChannelRepository channelRepository) {
        this.channelRepository = channelRepository;
    }

    @GetMapping("/channels")
    public List<Channel> getAllChannels() {
        return channelRepository.findAll();
    }
}
