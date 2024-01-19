package com.website.kmh.repository;

import com.website.kmh.domain.Channel;
import com.website.kmh.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findById(Long id);
    List<Post> findAllByOrderByCreatedAtDesc();
    List<Post> findByChannel(Channel channel);
}
