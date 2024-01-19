package com.website.kmh.service;

import com.website.kmh.domain.Post;
import com.website.kmh.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    //최신 게시글 목록 조회 서비스 메서드
    public List<Post> getLatestPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Post getPostById(Long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);

        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            System.out.println("Retrieved post: " + post);
            return post;
        } else {
            System.out.println("Post not found for postId: " + postId);
            return null;
        }
    }

}