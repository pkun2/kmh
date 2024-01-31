package com.website.kmh.service.impl;

import com.website.kmh.domain.Post;
import com.website.kmh.dto.PostDto;
import com.website.kmh.repository.PostRepository;
import com.website.kmh.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
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

    public Post savePost(Post post) {
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

    public Page<PostDto> findPostsByChannelId(Long channelId, Pageable pageable) {
        Page<Post> postPage = postRepository.findByChannelId(channelId, pageable);

        // Entity를 DTO로 변환
        return postPage.map(this::convertToDto);
    }

    private PostDto convertToDto(Post post) {
        if (post == null) {
            return null;
        }

        LocalDateTime createdAt = post.getCreatedAt() != null ?
                post.getCreatedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime() : null;

        return PostDto.builder()
                .id(post.getPostId())
                .userId(post.getUser().getId())
                .nickname(post.getUser().getNickname())
                .title(post.getTitle())
                .content(post.getContent())
                .createdAt(createdAt)
                .viewCount(post.getViewCount())
                .categoryTag(post.getCategoryTag())
                .channelId(post.getChannel().getId())
                .channelName(post.getChannel().getName())
                .goodCount(post.getGoodCount())
                .badCount(post.getBadCount())
                .build();
    }

    private void incrementViewCount(Post post) {
        post.setViewCount(post.getViewCount() + 1);
    }

}
