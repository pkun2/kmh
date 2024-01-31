package com.website.kmh.service;

import com.website.kmh.domain.Post;
import com.website.kmh.dto.PostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {
    Page<Post> getLatestPosts(Pageable pageable);
    Page<Post> searchPosts(String keyword, Pageable pageable);
    Post createPost(Post post);
    Post savePost(Post post);
    Post getPostById(Long postId);
    Page<PostDto> findPostsByChannelId(Long channelId, Pageable pageable);

}
