package com.website.kmh.controller;

import com.website.kmh.domain.Channel;
import com.website.kmh.repository.ChannelRepository;
import com.website.kmh.service.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class ChannelController {

    private final ChannelService channelService;

    public ChannelController(ChannelService channelService) {
        this.channelService = channelService;
    }

    @GetMapping("/channels")
    public List<Channel> getAllChannels() {
        List<Channel> channels = channelService.findAll();
        System.out.println(channels);
        return channels;
    }
}
