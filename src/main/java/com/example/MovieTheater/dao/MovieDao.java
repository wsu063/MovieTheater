package com.example.MovieTheater.dao;
import com.example.MovieTheater.dto.Movie;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MovieDao {
    public List<Movie> getMovieList() throws Exception;
}
