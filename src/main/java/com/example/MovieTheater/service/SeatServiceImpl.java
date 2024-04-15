package com.example.MovieTheater.service;

import com.example.MovieTheater.dao.SeatDao;
import com.example.MovieTheater.dto.Seat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServiceImpl implements SeatService {
    @Autowired
    SeatDao seatDao;

    @Override
    public List<Seat> getSeatList(int screenId) throws Exception {
        return seatDao.getSeatList(screenId);
    }

    @Override
    public List<Seat> getSeatListAll() throws Exception {
        return seatDao.getSeatListAll();
    }
}
