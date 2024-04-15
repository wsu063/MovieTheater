package com.example.MovieTheater.service;

import com.example.MovieTheater.dto.Member;

public interface MemberService {
    public Member loginMember(Member member) throws Exception;
    public Member registerMember(Member member) throws Exception;
    public void chargeMember(Member member, int charge) throws Exception;




}
