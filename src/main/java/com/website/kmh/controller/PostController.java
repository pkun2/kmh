package com.website.kmh.controller;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.Post;
import com.website.kmh.service.AccountService;
import com.website.kmh.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/latest")
    public List<Post> getLatestPost() {
        return postService.getLatestPosts();
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

    @PostMapping("/write")
    public ResponseEntity<Post> createPost(@RequestBody Post post, Authentication authentication) {
        // 인증된 사용자 정보 가져옴(user_id 가져오기 위함)
        Account principal = (Account) authentication.getPrincipal();
        Account user = accountService.getUserByUsername(principal.getUsername());

        // post 객체의 user 필드에 사용자 정보 설정
        post.setUser(user);

        Post newPost = postService.createPost(post);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }

}