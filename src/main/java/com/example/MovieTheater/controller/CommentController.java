package com.example.MovieTheater.controller;

import com.example.MovieTheater.dto.Comment;
import com.example.MovieTheater.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.net.URLDecoder;
import java.net.URLEncoder;

@Controller
public class CommentController {
    @Autowired
    CommentService commentService;

}
