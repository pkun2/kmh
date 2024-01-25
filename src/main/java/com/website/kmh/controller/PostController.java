package com.website.kmh.controller;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.Post;
import com.website.kmh.security.jwt.JwtTokenProvider;
import com.website.kmh.service.AccountService;
import com.website.kmh.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final JwtTokenProvider jwtTokenProvider;
    private final PostService postService;

    public PostController(PostService postService, JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.postService = postService;
    }

    @GetMapping("/latest")
    public List<Post> getLatestPost() {
        return postService.getLatestPosts();
    }

    // 게시글 상세 내용 불러오기
    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable("postId") Long postId) {
        Post post = postService.getPostById(postId);
        if (post != null) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 게시글 내 검색
    @GetMapping("/search")
    public List<Post> searchPosts(@RequestParam("keyword") String keyword) {
        return postService.searchPosts(keyword);
    }

    @Autowired
    private AccountService accountService;

    // 게시글 만들기
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