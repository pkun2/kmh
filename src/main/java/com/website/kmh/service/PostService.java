package com.website.kmh.service;

import com.website.kmh.domain.Post;
import com.website.kmh.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    //최신 게시글 목록 조회 서비스 메서드
    public Page<Post> getLatestPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    // title과 content 및 기타등등에서 값 찾음
    public Page<Post> searchPosts(String keyword, Pageable pageable) {
        return postRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);
    }

    // 게시글 만들기
    public Post createPost(Post post) {
        return postRepository.save(post);
    }



    public Post getPostById(Long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);

        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            System.out.println("Retrieved post: " + post);

            incrementViewCount(post);

            return post;
        } else {
            System.out.println("Post not found for postId: " + postId);
            return null;
        }
    }

    private void incrementViewCount(Post post) {
       post.setViewCount(post.getViewCount() + 1);
    }

}