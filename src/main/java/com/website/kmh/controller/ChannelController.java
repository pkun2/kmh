package com.website.kmh.controller;

import com.website.kmh.domain.UserChannel;
import com.website.kmh.dto.ChannelInfoDto;
import com.website.kmh.dto.CreateChannelDto;
import com.website.kmh.domain.Channel;
import com.website.kmh.security.jwt.JwtTokenProvider;
import com.website.kmh.service.ChannelService;
import com.website.kmh.service.UserChannelService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @GetMapping("/header/subscribed")
    public ResponseEntity<Map<Long, String>> getProfileSub(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        Long userId = jwtTokenProvider.getUserIdFromToken(token);
        Map<Long, String> subscribedChannel  = userChannelService.getProfileSubChannelMap(userId); //userId를 바탕으로 구독한 채널 가져오기
        return ResponseEntity.ok(subscribedChannel);
    }

    @GetMapping("/get")
    public ResponseEntity<List<ChannelInfoDto>> getSubscriptions(@RequestHeader("Authorization") String bearerToken) {
        // 토큰에서 사용자 ID 추출
        String token = bearerToken.substring(7);
        Long userId = jwtTokenProvider.getUserIdFromToken(token);

        // 사용자가 구독한 채널 ID 목록 가져오기
        List<Long> subscribedChannelIds = userChannelService.getSubscribedChannelIds(userId);

        // 전체 채널 목록 조회
        List<Channel> channels = channelService.findAll();

        // 각 채널에 대해 사용자가 구독 중인지 여부를 ChannelInfoDto 객체에 설정
        List<ChannelInfoDto> channelInfoDtos = channels.stream().map(channel -> {
            ChannelInfoDto channelInfoDto = new ChannelInfoDto(channel.getId(), channel.getName());
            channelInfoDto.setSubscribed(subscribedChannelIds.contains(channel.getId()));
            return channelInfoDto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(channelInfoDtos);
    }

    @PostMapping("/subscribe/{channelId}")
    public  ResponseEntity<UserChannel> postSubChannel(@PathVariable("channelId") Long channelId, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        Long userId = jwtTokenProvider.getUserIdFromToken(token);
        UserChannel subscription = userChannelService.subscribeChannel(userId, channelId);
        return ResponseEntity.ok(subscription);
    }

    @DeleteMapping("/cancelSub/{channelId}")
    public  ResponseEntity<?> postCancelSubChannel(@PathVariable("channelId") Long channelId, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        Long userId = jwtTokenProvider.getUserIdFromToken(token);

        userChannelService.CancelSubChannel(userId, channelId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/post")
    public ResponseEntity<String> postChannel(@RequestBody CreateChannelDto createChannelDto, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거

        //클라이언트의 헤더에 있는 토큰을 바탕으로 id를 가져옴
        Long userId = jwtTokenProvider.getUserIdFromToken(token);

        Channel savedChannel = channelService.createChannel(
            createChannelDto.getChannelName(),
            userId
        );

        if (savedChannel != null) {
            return ResponseEntity.ok("채널이 성공적으로 생성되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("채널 생성 실패");
        }
    }
}
