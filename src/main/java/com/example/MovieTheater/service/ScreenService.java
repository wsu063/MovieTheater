package com.example.MovieTheater.service;

import com.example.MovieTheater.dto.Screen;

import java.util.List;

public interface ScreenService {
    public List<Screen> getScreenList() throws Exception;

}
