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

import java.util.ArrayList;
import java.util.Collections;
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

    @GetMapping("/header/subscribed") // 헤더의 Channel에서 구독한 채널을 목록으로 불러옴
    public ResponseEntity<Map<Long, String>> getProfileSub(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        Long userId = jwtTokenProvider.getUserIdFromToken(token);
        Map<Long, String> subscribedChannel  = userChannelService.getProfileSubChannelMap(userId); //userId를 바탕으로 구독한 채널 가져오기
        return ResponseEntity.ok(subscribedChannel);
    }

    @GetMapping("/getChannelName")
    public ResponseEntity<List<Channel>> getPopularChannels() {
        List<Channel> channels = channelService.getPopularChannels();

        if (channels != null && !channels.isEmpty()) {
            return ResponseEntity.ok(channels); // 200 OK 상태와 함께 채널 리스트 반환
        } else {
            return ResponseEntity.noContent().build(); // 204 No Content 상태 반환
        }
    }

    @GetMapping("/get")
    public ResponseEntity<List<ChannelInfoDto>> getSubscriptions(@RequestHeader(value = "Authorization", required = false) String bearerToken) {
        List<Channel> channels = channelService.findAll();
        List<Long> subscribedChannelIds;

        if (bearerToken != null && !bearerToken.isEmpty()) {
            // 토큰에서 사용자 ID 추출
            String token = bearerToken.substring(7);
            Long userId = jwtTokenProvider.getUserIdFromToken(token);

            // 사용자가 구독한 채널 ID 목록 가져오기
            subscribedChannelIds = userChannelService.getSubscribedChannelIds(userId);
        } else {
            // 구독 정보가 없는 경우 빈 리스트 초기화
            subscribedChannelIds = Collections.emptyList();
        }

        // 각 채널에 대해 사용자가 구독 중인지 여부를 ChannelInfoDto 객체에 설정
        List<ChannelInfoDto> channelInfoDtos = channels.stream().map(channel -> {
            ChannelInfoDto channelInfoDto = new ChannelInfoDto(channel.getId(), channel.getName());
            channelInfoDto.setSubscribed(subscribedChannelIds.contains(channel.getId()));
            return channelInfoDto;
        }).collect(Collectors.toList());

        System.out.println("channelInfoDto값: " + channelInfoDtos);
        return ResponseEntity.ok(channelInfoDtos);
    }

    @GetMapping("/get/{channelName}")
    public ResponseEntity<ChannelInfoDto> getChannel(@PathVariable("channelName") String channelName, @RequestHeader(value = "Authorization", required = false) String bearerToken) {
        Channel channel = channelService.getChannelByName(channelName);

        Long userId = null;
        if (bearerToken != null && !bearerToken.isEmpty()) {
            String token = bearerToken.substring(7);
            userId = jwtTokenProvider.getUserIdFromToken(token);
        }

        boolean subscribed = false;
        if (userId != null) {
            List<Long> subscribedChannelIds = userChannelService.getSubscribedChannelIds(userId);
            subscribed = subscribedChannelIds.contains(channel.getId());
        }

        ChannelInfoDto channelInfoDto = new ChannelInfoDto(channel.getId(), channel.getName());
        channelInfoDto.setSubscribed(subscribed);

        System.out.println("channelInfoDto값: " + channelInfoDto);
        return ResponseEntity.ok(channelInfoDto);
    }

    @PostMapping("/subscribe/{channelId}") //채널 구독하는 api
    public  ResponseEntity<UserChannel> postSubChannel(@PathVariable("channelId") Long channelId, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        Long userId = jwtTokenProvider.getUserIdFromToken(token);
        UserChannel subscription = userChannelService.subscribeChannel(userId, channelId);
        return ResponseEntity.ok(subscription);
    }

    @DeleteMapping("/cancelSub/{channelId}") // 채널 구독취소하는 api
    public  ResponseEntity<?> postCancelSubChannel(@PathVariable("channelId") Long channelId, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        Long userId = jwtTokenProvider.getUserIdFromToken(token);

        userChannelService.CancelSubChannel(userId, channelId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/post") // 채널 생성
    public ResponseEntity<String> postChannel(@RequestBody CreateChannelDto createChannelDto, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거

        //클라이언트의 헤더에 있는 토큰을 바탕으로 id를 가져옴
        Long userId = jwtTokenProvider.getUserIdFromToken(token);

        //채널 생성
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
