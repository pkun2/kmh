package com.website.kmh.service;

import com.website.kmh.entity.Post;
import com.website.kmh.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    //최신 게시글 목록 조회 서비스 메서드
    public List<Post> getLatestPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }
}
