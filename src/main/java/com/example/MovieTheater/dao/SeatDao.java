package com.example.MovieTheater.dao;
import com.example.MovieTheater.dto.Seat;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SeatDao {
    public List<Seat> getSeatList(int screenId) throws Exception;
    public List<Seat> getSeatListAll() throws Exception;
}
