package com.website.kmh.repository;

import com.website.kmh.domain.Channel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
    List<Channel> findTop10ByOrderBySubscribersDesc();
    Optional<Channel> findByName(String channelName);
}
