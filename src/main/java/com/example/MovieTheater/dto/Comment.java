package com.example.MovieTheater.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Comment {
    private int commentId;
    private String content;
    private String writeDate;
    private String updateDate;

    private int reviewId;
    private int memberId;

    private Review review;
    private Member member;
}
