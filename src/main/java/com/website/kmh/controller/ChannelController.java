package com.website.kmh.controller;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.Post;
import com.website.kmh.domain.UserChannel;
import com.website.kmh.dto.ChannelDto;
import com.website.kmh.domain.Channel;
import com.website.kmh.security.jwt.JwtTokenProvider;
import com.website.kmh.service.AccountService;
import com.website.kmh.service.ChannelService;
import com.website.kmh.service.UserChannelService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/channel")
public class ChannelController {

    private final ChannelService channelService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserChannelService userChannelService;

    public ChannelController(ChannelService channelService, JwtTokenProvider jwtTokenProvider, UserChannelService userChannelService) {
        this.channelService = channelService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userChannelService = userChannelService;
    }

    @GetMapping("/get")
    public List<Channel> getAllChannels() {
        List<Channel> channels = channelService.findAll();
        System.out.println(channels);
        return channels;
    }

    @PostMapping("/subscribe/{channelId}")
    public  ResponseEntity<UserChannel> postSubChannel(@PathVariable("channelId") Long channelId, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        Long userId = jwtTokenProvider.getUserIdFromToken(token);
        UserChannel subscription = userChannelService.subscribeChannel(userId, channelId);
        return ResponseEntity.ok(subscription);
    }

    @PostMapping("/post")
    public ResponseEntity<String> postChannel(@RequestBody ChannelDto channelDto, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거

        //클라이언트의 헤더에 있는 토큰을 바탕으로 id를 가져옴
        Long userId = jwtTokenProvider.getUserIdFromToken(token);

        Channel savedChannel = channelService.createChannel(
            channelDto.getChannelName(),
            userId
        );

        if (savedChannel != null) {
            return ResponseEntity.ok("채널이 성공적으로 생성되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("채널 생성 실패");
        }
    }
}
