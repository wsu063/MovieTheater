package com.example.MovieTheater.service;

import com.example.MovieTheater.dao.ReserveDao;
import com.example.MovieTheater.dto.Reserve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ReserveServiceImpl implements ReserveService{

    @Autowired
    private ReserveDao reserveDao;

    @Override
    public List<Reserve> getReserveList(Map map) throws Exception {
        return reserveDao.getReserveList(map);
    }

    @Override
    public void insertReserve(Reserve reserve) throws Exception {
        reserveDao.insertReserve(reserve);

    }

    @Override
    public void deleteReserve(Reserve reserve) throws Exception {
        reserveDao.deleteReserve(reserve);
    }

    @Override
    public int getDataCount(Map map) throws Exception {
        return reserveDao.getDataCount(map);
    }

    @Override
    public void cancelReserve(int reserveId) throws Exception {
        reserveDao.cancelReserve(reserveId);
    }
}
