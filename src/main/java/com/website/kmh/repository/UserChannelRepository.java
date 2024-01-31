package com.website.kmh.repository;

import com.website.kmh.domain.UserChannel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserChannelRepository extends JpaRepository<UserChannel, Long> {
    //해당 userId의 유저가 가지고 있는 채널 검색
    List<UserChannel> findByAccountId(Long userId);

    //해당 userId와 channelId가 같은 구독중인 채널 삭제
    @Transactional
    void deleteByAccountIdAndChannelId(Long userId, Long channelId);
}
