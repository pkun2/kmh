package com.website.kmh.controller;

import com.website.kmh.domain.Comment;
import com.website.kmh.service.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/add/comment")
public class CommentController {

    private final CommentService commentService;
    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public String addComment(@RequestBody Comment comment) {
        // 객체의 내용을 로그에 출력
        logger.info("Received comment: {}", comment);

        Comment savedComment = commentService.createComment(comment);
        if (savedComment != null) {
            return "finish";
        } else {
            return "Failed to add comment";
        }
    }
}