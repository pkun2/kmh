package com.website.kmh.service;

import com.website.kmh.domain.Post;
import com.website.kmh.dto.PostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {
    Post createPost(Post post); // 게시글 작성
    PostDto getPostById(Long postId); // id를 바탕으로 게시글의 상세정보 반환
    Page<PostDto> searchPosts(String keyword, Pageable pageable); // 게시글 검색
    Page<PostDto> findPostsByChannelName(String channelName, Pageable pageable); // 해당 채널의 게시글 검색

}
