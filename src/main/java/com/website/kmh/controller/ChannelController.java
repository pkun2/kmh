package com.website.kmh.controller;

import com.website.kmh.domain.Channel;
import com.website.kmh.service.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/channel")
public class ChannelController {

    private final ChannelService channelService;

    @Autowired
    public ChannelController(ChannelService channelService) {
        this.channelService = channelService;
    }

    @GetMapping("/channels")
    public List<Channel> getAllChannels() {
        List<Channel> channels = channelService.findAll();
        System.out.println(channels);
        return channels;
    }

    @PostMapping("/post")
    public ResponseEntity<String> postChannel(@RequestBody Channel request) {
        Channel savedChannel = channelService.createChannel(
                request.getChannel_id(),
                request.getChannel_name(),
                request.getUser_id()
        );

        if (savedChannel != null) {
            return ResponseEntity.ok("Channel created successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create channel");
        }
    }
}
