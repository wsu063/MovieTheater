package com.example.MovieTheater.controller;

import com.example.MovieTheater.service.ScreenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class ScreenController {
    @Autowired
    ScreenService screenService;
}
