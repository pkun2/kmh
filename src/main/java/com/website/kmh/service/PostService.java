package com.website.kmh.service;

import com.website.kmh.domain.Post;
import com.website.kmh.dto.PostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {
    Page<Post> searchPosts(String keyword, Pageable pageable); // 게시글 검색
    Post createPost(Post post); // 게시글 작성
    Post savePost(Post post); // 게시글 저장
    Post getPostById(Long postId); // id를 바탕으로 게시글의 상세정보 반환
    Page<PostDto> findPostsByChannelId(Long channelId, Pageable pageable); // 해당 채널의 게시글 검색

}
