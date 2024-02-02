package com.website.kmh.service.impl;

import com.website.kmh.domain.Post;
import com.website.kmh.dto.PostDto;
import com.website.kmh.repository.PostRepository;
import com.website.kmh.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // 게시글 만들기
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public PostDto getPostById(Long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);

        if (postOptional.isPresent()) {
            Post post = postOptional.get();

            // 조회수 증가
            post.setViewCount(post.getViewCount() + 1);

            // 변경 사항(조회수 증가) 저장
            Post updatedPost = postRepository.save(post);

            incrementViewCount(post);

            PostDto postDto = PostDto.builder()
                    .id(post.getPostId())
                    .userId(post.getUser().getId())
                    .nickname(post.getUser().getNickname())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .createdAt(post.getCreatedAt())
                    .viewCount(updatedPost.getViewCount())
                    .categoryTag(post.getCategoryTag())
                    .channelId(post.getChannel().getId())
                    .channelName(post.getChannel().getName())
                    .goodCount(post.getGoodCount())
                    .badCount(post.getBadCount())
                    .build();

            return postDto;
        } else {
            System.out.println("Post not found for postId: " + postId);
            return null;
        }
    }

    // title과 content 및 기타등등에서 값 찾음
    public Page<PostDto> searchPosts(String keyword, Pageable pageable) {
        Page<Post> postPage = postRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);

        // Entity를 DTO로 변환
        return postPage.map(this::convertToDto);
    }

    public Page<PostDto> findPostsByChannelName(String channelName, Pageable pageable) { // 특정 채널에 포함된 게시글 가져오기
        Page<Post> postPage = postRepository.findByChannelName(channelName, pageable);

        // Entity를 DTO로 변환
        return postPage.map(this::convertToDto);
    }

    private PostDto convertToDto(Post post) {
        if (post == null) {
            return null;
        }

        return PostDto.builder()
                .id(post.getPostId())
                .userId(post.getUser().getId())
                .nickname(post.getUser().getNickname())
                .title(post.getTitle())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .viewCount(post.getViewCount())
                .categoryTag(post.getCategoryTag())
                .channelId(post.getChannel().getId())
                .channelName(post.getChannel().getName())
                .goodCount(post.getGoodCount())
                .badCount(post.getBadCount())
                .build();
    }

    // 조회수 증가
    private void incrementViewCount(Post post) {
        post.setViewCount(post.getViewCount() + 1);
    }

}
