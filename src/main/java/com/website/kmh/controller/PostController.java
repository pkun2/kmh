package com.website.kmh.controller;

import com.website.kmh.domain.Post;
import com.website.kmh.domain.User;
import com.website.kmh.service.PostService;
import com.website.kmh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    //임시 절차임
    @Autowired
    private UserService userService;

    @PostMapping("/test")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        // UserService를 통해 id가 2인 User 객체를 가져옵니다.
        User user = userService.getUserById(2);

        // Post 객체의 user 필드에 사용자 정보를 설정합니다.
        post.setUser(user);

        Post newPost = postService.createPost(post);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }

}