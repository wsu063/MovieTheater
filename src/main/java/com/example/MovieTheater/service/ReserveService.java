package com.example.MovieTheater.service;

import com.example.MovieTheater.dto.Reserve;

import java.util.List;
import java.util.Map;


public interface ReserveService {
    //예약 리스트 가져오기
    public List<Reserve> getReserveList(Map map) throws Exception;
    //예약하기
    public void insertReserve(Reserve reserve) throws Exception;
    //예약 취소하기
    public void deleteReserve(Reserve reserve) throws Exception;

    public int getDataCount(Map map) throws Exception;

    public void cancelReserve(int reserveId) throws Exception;


}
