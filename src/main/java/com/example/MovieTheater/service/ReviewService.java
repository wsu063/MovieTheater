package com.example.MovieTheater.service;

import com.example.MovieTheater.dto.Review;

import java.util.List;
import java.util.Map;


public interface ReviewService {
    public List<Review> getReviewList(Map map) throws Exception;

    public int getDataCount(Map map) throws Exception;
    public int getMovieCount(Map map) throws Exception;


    public Review getReviewDetail(int reviewId) throws Exception;

    public void updateHitCount(int reviewId) throws Exception;

    public void insertReview(Review review) throws Exception;
    public void updateReview(Review review) throws Exception;
    public void deleteReview(int reviewId) throws Exception;
}
