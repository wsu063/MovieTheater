package com.example.MovieTheater.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Review {
    private int reviewId;
    private String subject;
    private int rate;
    private String content;
    private String writeDate;
    private String updateDate;
    private int views;

    private int memberId;
    private int movieId;

    private Movie movie;
    private Member member;
}
