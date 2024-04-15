package com.example.MovieTheater.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Reserve {
    private int reserveId;
    private String resDate;
    private int price;

    private int memberId;
    private int seatId;

    private Member member;
    private Seat seat;
}
