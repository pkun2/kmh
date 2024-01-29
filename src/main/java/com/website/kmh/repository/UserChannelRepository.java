package com.website.kmh.repository;

import com.website.kmh.domain.UserChannel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserChannelRepository extends JpaRepository<UserChannel, Long> {
    List<UserChannel> findByAccountId(Long userId);

    @Transactional
    void deleteByAccountIdAndChannelId(Long accountId, Long channelId);
}
