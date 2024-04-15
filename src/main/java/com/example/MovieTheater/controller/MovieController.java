package com.example.MovieTheater.controller;

import com.example.MovieTheater.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class MovieController {
    @Autowired
    MovieService movieService;
}
