package com.website.kmh.service;

import com.website.kmh.domain.Post;
import com.website.kmh.dto.PostDto;
import com.website.kmh.repository.PostRepository;
import lombok.Builder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<PostDto> findPostsByChannelId(Long channelId) {
        return postRepository.findByChannelId(channelId)
                .stream()
                .map(post -> convertToDto(post)) // Entity를 DTO로 변환
                .collect(Collectors.toList());
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