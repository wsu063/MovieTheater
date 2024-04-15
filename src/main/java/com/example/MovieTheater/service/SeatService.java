package com.example.MovieTheater.service;

import com.example.MovieTheater.dto.Seat;

import java.util.List;

public interface SeatService {
    public List<Seat> getSeatList(int screenId) throws Exception;
    public List<Seat> getSeatListAll() throws Exception;


}
