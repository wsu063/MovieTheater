package com.example.MovieTheater.dao;

import com.example.MovieTheater.dto.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberDao {
    public Member loginMember(Member member) throws Exception;
    public Member registerMember(Member member) throws Exception;
    public void chargeMember(Member member, int charge) throws Exception;

}
