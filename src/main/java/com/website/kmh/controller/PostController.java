package com.website.kmh.controller;

import com.website.kmh.domain.Account;
import com.website.kmh.domain.Comment;
import com.website.kmh.domain.Channel;
import com.website.kmh.domain.Post;
import com.website.kmh.dto.CommentDto;
import com.website.kmh.dto.CreatePostDto;
import com.website.kmh.dto.PostDto;
import com.website.kmh.security.jwt.JwtTokenProvider;
import com.website.kmh.service.AccountService;
import com.website.kmh.service.CommentService;
import com.website.kmh.service.ChannelService;
import com.website.kmh.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final JwtTokenProvider jwtTokenProvider;
    private final PostService postService;
    private final AccountService accountService;
    private final ChannelService channelService;
    private final CommentService commentService;

    public PostController(PostService postService, JwtTokenProvider jwtTokenProvider, AccountService accountService, ChannelService channelService, CommentService commentService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.postService = postService;
        this.accountService = accountService;
        this.channelService = channelService;
        this.commentService = commentService;
    }

    // 게시글 가져와 /post에 츌력해주는 get 요청. 기본임
    @GetMapping("/latest/{channelName}")
    public ResponseEntity<Page<PostDto>> getLatestPost(
            @PathVariable("channelName") String channelName,
            @RequestParam(name = "keyword", required = false) String keyword, // 검색 키워드
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

        Page<PostDto> posts;

        if (keyword != null) {
            // 검색어가 있으면, 검색 로직 수행
            posts = postService.searchPosts(keyword, PageRequest.of(page - 1, limit, sort));
        }
        else {
            // 검색어가 없으면, 다른 로직(정렬, 페이지 이동 등) 수행
            posts = postService.findPostsByChannelName(channelName, PageRequest.of(page - 1, limit, sort));
        }
        return ResponseEntity.ok(posts);
    }


    @GetMapping("/{postId}") // 게시글 상세 내용 불러오기
    public ResponseEntity<PostDto> getPostById(@PathVariable("postId") Long postId) {
        PostDto postDto = postService.getPostById(postId); //id를 바탕으로 게시글을 불러옴
        if (postDto != null) { // 해당게시글이 존재하면
            //조회수 증가 로직은 PostServiceImpl에서 구현
            return new ResponseEntity<>(postDto, HttpStatus.OK); //상세내용을 가져옴
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    // 게시글 상세 내용 중 댓글 불러오기
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentDto>> getCommentsByPostId(@PathVariable("postId") Long postId) {
        List<CommentDto> comments = commentService.getCommentsByPostId(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // 게시글 만들기
    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody CreatePostDto createPostDto, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7); // "Bearer " 제거
        //클라이언트의 헤더에 있는 토큰을 바탕으로 id를 가져옴
        Long userId = jwtTokenProvider.getUserIdFromToken(token);
        //해당하는 계정을 db로 부터 가져옴
        Account user = accountService.getUserById(userId);

        // Post 객체 생성 및 필드 설정
        Post post = new Post();
        post.setTitle(createPostDto.getTitle()); // 제목
        post.setContent(createPostDto.getContent()); // 내용
        post.setCategoryTag(createPostDto.getCategoryTag()); // 카테고리(채널 구분)
        post.setGoodCount(createPostDto.getGoodCount()); // 추천
        post.setBadCount(createPostDto.getBadCount()); // 비추천
        post.setViewCount(createPostDto.getViewCount()); // 조회수

        // Channel 객체를 찾아서 설정
        Channel channel = channelService.getChannelByName(createPostDto.getChannelName());
        post.setChannel(channel);

        // 사용자 정보 설정
        post.setUser(user);

        Post newPost = postService.createPost(post);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }

}
