package com.example.MovieTheater.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Member {
    private int memberId;
    private String email;
    private String password;
    private String name;
    private String regDate;
    private int balance;
}
