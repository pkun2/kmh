package com.website.kmh.service.impl;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.Channel;
import com.website.kmh.domain.UserChannel;
import com.website.kmh.dto.ChannelInfoDto;
import com.website.kmh.repository.ChannelRepository;
import com.website.kmh.repository.UserChannelRepository;
import com.website.kmh.service.AccountService;
import com.website.kmh.service.ChannelService;
import com.website.kmh.service.UserChannelService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserChannelServiceImpl implements UserChannelService {
    private final UserChannelRepository userChannelRepository;
    private final ChannelRepository channelRepository;
    private final AccountService accountService;
    private final ChannelService channelService;

    public UserChannelServiceImpl (UserChannelRepository userChannelRepository, AccountService accountService, ChannelService channelService, ChannelRepository channelRepository) {
        this.userChannelRepository = userChannelRepository;
        this.accountService = accountService;
        this.channelService = channelService;
        this.channelRepository = channelRepository;
    }

    @Override
    public List<Long> getSubscribedChannelIds(Long userId) {
        // UserChannel 엔티티에서 사용자 ID에 해당하는 채널 ID 목록을 추출
        return userChannelRepository.findByAccountId(userId)
                .stream()
                .map(UserChannel::getChannel)
                .map(Channel::getId)
                .collect(Collectors.toList());
    }

    @Override
    public void CancelSubChannel(Long userId, Long channelId) {
        userChannelRepository.deleteByAccountIdAndChannelId(userId, channelId);
    }

    @Override
    public UserChannel subscribeChannel(Long userId, Long channelId) {
        UserChannel subscription = new UserChannel();

        Account user = accountService.getUserById(userId);
        Channel channel = channelService.getChannelById(channelId);

        subscription.setAccount(user);
        subscription.setChannel(channel);
        subscription.setJoinDate(LocalDate.now());
        subscription.setRole(UserChannel.Role.USER);

        return userChannelRepository.save(subscription);
    }

//    @Override
//    public List<ChannelInfoDto> getSubChannel(Long userId) {
//        // 사용자가 구독한 채널의 ID 목록을 가져옴
//        List<Long> subscribedChannelIds = userChannelRepository.findByAccountId(userId)
//                .stream()
//                .map(UserChannel::getChannel)
//                .map(Channel::getChannel_id)
//                .collect(Collectors.toList());
//
//        // 전체 채널 목록을 가져옴
//        List<Channel> channels = channelRepository.findAll();
//
//        // 채널 목록을 ChannelInfoDto 리스트로 변환
//        return channels.stream()
//                .map(channel -> new ChannelInfoDto(
//                        channel.getChannel_id(),
//                        channel.getChannel_name(),
//                        subscribedChannelIds.contains(channel.getChannel_id())
//                ))
//                .collect(Collectors.toList());
//    }

    @Override
    public List<String> getProfileSubChannel(Long userId) {
        return userChannelRepository.findByAccountId(userId)
                .stream()
                .map(userChannel -> userChannel.getChannel().getName())
                .collect(Collectors.toList());
    }
}
