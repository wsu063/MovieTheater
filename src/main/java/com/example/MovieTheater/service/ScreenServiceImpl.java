package com.example.MovieTheater.service;

import com.example.MovieTheater.dao.ScreenDao;
import com.example.MovieTheater.dto.Screen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScreenServiceImpl implements ScreenService{

    @Autowired
    ScreenDao screenDao;

    @Override
    public List<Screen> getScreenList() throws Exception {
        return screenDao.getScreenList();
    }


}
