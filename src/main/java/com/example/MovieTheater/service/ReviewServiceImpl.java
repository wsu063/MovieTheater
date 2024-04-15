package com.example.MovieTheater.service;

import com.example.MovieTheater.dao.ReviewDao;
import com.example.MovieTheater.dto.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    private ReviewDao reviewDao;

    @Override
    public List<Review> getReviewList(Map map) throws Exception {
        return reviewDao.getReviewList(map);
    }

    @Override
    public int getDataCount(Map map) throws Exception {
        return reviewDao.getDataCount(map);
    }

    @Override
    public int getMovieCount(Map map) throws Exception {
        return reviewDao.getMovieCount(map);
    }

    @Override
    public Review getReviewDetail(int reviewId) throws Exception {
        return reviewDao.getReviewDetail(reviewId);
    }

    @Override
    public void updateHitCount(int reviewId) throws Exception {
        reviewDao.updateHitCount(reviewId);
    }

    @Override
    public void insertReview(Review review) throws Exception {
        reviewDao.insertReview(review);
    }

    @Override
    public void updateReview(Review review) throws Exception {
        reviewDao.updateReview(review);
    }

    @Override
    public void deleteReview(int reviewId) throws Exception {
        reviewDao.deleteReview(reviewId);
    }
}
