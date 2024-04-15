package com.example.MovieTheater.service;

import com.example.MovieTheater.dao.MemberDao;
import com.example.MovieTheater.dto.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    private MemberDao memberDao;

    @Override
    public Member loginMember(Member member) throws Exception {
        return memberDao.loginMember(member);
    }

    @Override
    public Member registerMember(Member member) throws Exception {
        return memberDao.registerMember(member);
    }

    @Override
    public void chargeMember(Member member, int charge) throws Exception {
        memberDao.chargeMember(member, charge);
    }
}
