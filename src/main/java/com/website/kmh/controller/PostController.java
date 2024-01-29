package com.website.kmh.controller;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.Post;
import com.website.kmh.security.jwt.JwtTokenProvider;
import com.website.kmh.service.AccountService;
import com.website.kmh.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;
import java.util.ArrayList;
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

    // 게시글 가져와 /post에 츌력해주는 get 요청. 기본임
    @GetMapping("/latest")
    public Page<Post> getLatestPost(
            @RequestParam(name = "p", defaultValue = "1") int page, // 페이지 번호
            @RequestParam(name = "sort", defaultValue = "createdAt") List<String> sortBys, // 어떤 것을 기준으로 정렬할 것인지
            @RequestParam(name = "sortOrder", defaultValue = "desc") List<String> sortOrders, // 오름차순과 내림차순(오름차순: asc, 내림차순: desc)
            @RequestParam(name = "limit", defaultValue = "30") int limit // 페이지 당 보여줄 게시글 갯수
    ) {
        List<Order> orders = new ArrayList<>();
        for (int i = 0; i < sortBys.size(); i++) {
            orders.add(new Sort.Order(Sort.Direction.fromString(sortOrders.get(i)), sortBys.get(i)));
        }
        // cratedAt이 아닌 다른 정렬을 사용했을 때, 조회수가 같을 경우 createdAt로 내림차순 정렬 한 번 더 수행
        orders.add(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        Sort sort = Sort.by(orders);
        return postService.getLatestPosts(PageRequest.of(page - 1, limit, sort));
    }


    // 게시글 내 검색
    @GetMapping("/search")
    public Page<Post> searchPosts(
            @RequestParam("keyword") String keyword,
            @RequestParam(name = "p", defaultValue = "0") int page,
            @RequestParam(name = "sort", defaultValue = "createdAt") String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "desc") String sortOrder,
            @RequestParam(name = "limit", defaultValue = "30") int limit
    ) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), sortBy);
        return postService.searchPosts(keyword, PageRequest.of(page - 1, limit, sort));
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