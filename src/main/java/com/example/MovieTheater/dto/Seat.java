package com.example.MovieTheater.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Seat {
    private int seatId;
    private String location;

    private int screenId;
    private int movieId;

    private Screen screen;
    private Movie movie;
}