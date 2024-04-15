package com.example.MovieTheater.dao;
import com.example.MovieTheater.dto.Screen;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ScreenDao {
    public List<Screen> getScreenList() throws Exception;
}
