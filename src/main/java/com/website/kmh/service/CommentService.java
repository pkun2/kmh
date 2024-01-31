package com.website.kmh.service;

import com.website.kmh.domain.Comment;
import com.website.kmh.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) { //댓글 작성
        comment.setTime(LocalDateTime.now());
        comment.setDouble_comment(1L);
        return commentRepository.save(comment);
    }
}
