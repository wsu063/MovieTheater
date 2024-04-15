package com.example.MovieTheater.service;

import com.example.MovieTheater.dao.MovieDao;
import com.example.MovieTheater.dto.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MovieServiceImpl implements MovieService{
    @Autowired
    MovieDao movieDao;

    @Override
    public List<Movie> getMovieList() throws Exception {
        return movieDao.getMovieList();
    }
}
