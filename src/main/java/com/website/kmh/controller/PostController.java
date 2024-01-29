package com.website.kmh.controller;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.Post;
import com.website.kmh.dto.PostDto;
import com.website.kmh.security.jwt.JwtTokenProvider;
import com.website.kmh.service.AccountService;
import com.website.kmh.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final JwtTokenProvider jwtTokenProvider;
    private final PostService postService;

    public PostController(PostService postService, JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.postService = postService;
    }

    @GetMapping("/latest/{channelId}")
    public ResponseEntity<List<PostDto>> getPostsByChannelId(@PathVariable("channelId") Long channelId) {
        List<PostDto> posts = postService.findPostsByChannelId(channelId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable("postId") Long postId) {
        Post post = postService.getPostById(postId);
        if (post != null) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    //임시 절차임
    @Autowired
    private AccountService accountService;

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody Post post, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        //클라이언트의 헤더에 있는 토큰을 바탕으로 id를 가져옴
        Long userId = jwtTokenProvider.getUserIdFromToken(token);

        //해당하는 계정을 db로 부터 가져옴
        Account user = accountService.getUserById(userId);

        // Post 객체의 user 필드에 사용자 정보를 설정
        post.setUser(user);

        Post newPost = postService.createPost(post);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }

}