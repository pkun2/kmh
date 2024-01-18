package com.website.kmh.repository;

import com.website.kmh.domain.Channel;
import com.website.kmh.domain.Post;
import com.website.kmh.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByCreatedAtDesc();
    List<Post> findByChannel(Channel channel);
}