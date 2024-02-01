package com.website.kmh.service;

import com.website.kmh.domain.Comment;
import com.website.kmh.dto.CommentDto;

import java.util.List;

public interface CommentService {

    List<CommentDto> getCommentsByPostId(Long postId);

    Comment createComment(Comment comment);
}
