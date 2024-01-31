package com.website.kmh.repository;

import com.website.kmh.domain.Channel;
import com.website.kmh.domain.Post;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    // userId 가져오기 위한 함수
    Optional<Post> findById(Long id);
    // 검색을 위한 함수, html을 제외하고 검색
    Page<Post> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);
    // channelId와 정렬기준 등이 포함된 것들을 토대로 가져옴
    Page<Post> findByChannelId(Long channelId, Pageable pageable);
}
