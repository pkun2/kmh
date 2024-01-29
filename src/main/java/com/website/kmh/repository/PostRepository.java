package com.website.kmh.repository;

import com.website.kmh.domain.Channel;
import com.website.kmh.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    // userId 가져오기 위한 함수
    Optional<Post> findById(Long id);
    List<Post> findAllByOrderByCreatedAtDesc();
    List<Post> findByChannel(Channel channel);

    // 검색을 위한 함수, html을 제외하고 검색
    @Query(value = "SELECT * FROM kmh.posts WHERE REGEXP_REPLACE(content, '<[^>]+>', '') LIKE %?1%", nativeQuery = true)
    List<Post> findByTitleContainingOrContentContaining(String title, String content);
}
