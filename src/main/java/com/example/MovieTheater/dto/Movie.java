package com.example.MovieTheater.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Movie {
    private int movieId;
    private String movieSubject;
    private String content;
    private String openDate;
    private String closeDate;
}
