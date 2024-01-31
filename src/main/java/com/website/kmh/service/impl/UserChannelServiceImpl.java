package com.website.kmh.service.impl;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.Channel;
import com.website.kmh.domain.UserChannel;
import com.website.kmh.repository.ChannelRepository;
import com.website.kmh.repository.UserChannelRepository;
import com.website.kmh.service.AccountService;
import com.website.kmh.service.ChannelService;
import com.website.kmh.service.UserChannelService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
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
    public Map<Long, String> getProfileSubChannelMap(Long userId) {
        // UserChannel 엔티티에서 사용자 ID에 해당하는 채널을 조회
        List<UserChannel> subscribedChannels = userChannelRepository.findByAccountId(userId);

        // 채널 ID와 채널 이름을 매핑
        return subscribedChannels.stream()
                .collect(Collectors.toMap(
                        userChannel -> userChannel.getChannel().getId(),
                        userChannel -> userChannel.getChannel().getName()));
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
    public void CancelSubChannel(Long userId, Long channelId) { // 구독중인 채널 취소
        userChannelRepository.deleteByAccountIdAndChannelId(userId, channelId);
    }

    @Override
    public UserChannel subscribeChannel(Long userId, Long channelId) { //채널 구독
        UserChannel subscription = new UserChannel();

        Account user = accountService.getUserById(userId);
        Channel channel = channelService.getChannelById(channelId);

        subscription.setAccount(user);
        subscription.setChannel(channel);
        subscription.setJoinDate(LocalDate.now());
        subscription.setRole(UserChannel.Role.USER);

        return userChannelRepository.save(subscription);
    }

    @Override
    public List<String> getProfileSubChannel(Long userId) { //프로필에서 리스트 형태로 구독중인 채널 반환
        return userChannelRepository.findByAccountId(userId)
                .stream()
                .map(userChannel -> userChannel.getChannel().getName())
                .collect(Collectors.toList());
    }
}
