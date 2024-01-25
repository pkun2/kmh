package com.website.kmh.service.impl;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.Channel;
import com.website.kmh.domain.UserChannel;
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
    private final AccountService accountService;
    private final ChannelService channelService;

    public UserChannelServiceImpl (UserChannelRepository userChannelRepository, AccountService accountService, ChannelService channelService) {
        this.userChannelRepository = userChannelRepository;
        this.accountService = accountService;
        this.channelService = channelService;
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

    @Override
    public List<String> getSubChannel(Long userId) {
        return userChannelRepository.findByAccountId(userId)
                .stream()
                .map(userChannel -> userChannel.getChannel().getChannel_name())
                .collect(Collectors.toList());
    }
}
