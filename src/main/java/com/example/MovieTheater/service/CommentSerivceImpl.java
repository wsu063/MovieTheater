package com.example.MovieTheater.service;

import com.example.MovieTheater.dao.CommentDao;
import com.example.MovieTheater.dto.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CommentSerivceImpl implements CommentService{
    @Autowired
    CommentDao commentDao;

    @Override
    public List<Comment> getComment(Map map) throws Exception {
        return commentDao.getComment(map);
    }

    @Override
    public void insertComment(Comment commnet) throws Exception {
        commentDao.insertComment(commnet);
    }

    @Override
    public void deleteComment(int commentId) throws Exception {
        commentDao.deleteComment(commentId);
    }

    @Override
    public Comment getCommentById(int commentId) throws Exception {
        return commentDao.getCommentById(commentId);
    }
}
