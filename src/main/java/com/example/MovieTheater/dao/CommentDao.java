package com.example.MovieTheater.dao;
import com.example.MovieTheater.dto.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CommentDao {
    public List<Comment> getComment(Map map) throws Exception;

    public void insertComment(Comment commnet) throws Exception;

    public void deleteComment(int commentId) throws Exception;

    public Comment getCommentById(int commentId) throws Exception;
}
