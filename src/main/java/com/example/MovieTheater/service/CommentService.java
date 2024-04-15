package com.example.MovieTheater.service;

import com.example.MovieTheater.dto.Comment;

import java.util.List;
import java.util.Map;

public interface CommentService {
    public List<Comment> getComment(Map map) throws Exception;

    public void insertComment(Comment commnet) throws Exception;

    public void deleteComment(int commentId) throws Exception;

    public Comment getCommentById(int commentId) throws Exception;

}
