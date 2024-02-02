package com.website.kmh.service.impl;

import com.website.kmh.domain.Comment;
import com.website.kmh.dto.CommentDto;
import com.website.kmh.repository.CommentRepository;
import com.website.kmh.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public List<CommentDto> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream()
                .map(comment -> new CommentDto(comment.getNickname(), comment.getContent(), comment.getDouble_comment(), comment.getTime(), comment.getUserId()))
                .collect(Collectors.toList());
    }

    @Override
    public Comment createComment(Comment comment) {
        comment.setTime(LocalDateTime.now());
        comment.setDouble_comment(1L);
        return commentRepository.save(comment);
    }
}
