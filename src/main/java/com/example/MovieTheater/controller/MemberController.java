package com.example.MovieTheater.controller;

import com.example.MovieTheater.dto.Member;
import com.example.MovieTheater.service.MemberService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MemberController {
    @Autowired
    MemberService memberService;

    @GetMapping(value= "/login") // localhost/login
    public String login() {
        return "member/login";
    }

    @PostMapping(value="/login")
    public String loginMember(Member member, HttpSession session) { // 로그인 처리
        //1. 사용자가 입력한 로그인 데이터와 DB에 저장된 데이터가 맞는지 비교
        try {
            Member loginMember = memberService.loginMember(member);
            //2. 데이터가 일치하면(로그인 성공시) index페이지로 이동
            if(loginMember != null) {
                //로그인 성공시 로그인한 사람의 name과 member_id를 세션에 저장
                // .setAttribute(키, 값) -> 세션에 값을 저장
                session.setAttribute("name", loginMember.getName());
                session.setAttribute("member_id",loginMember.getMemberId());
                session.setAttribute("balance", loginMember.getBalance());
                return "redirect:/";
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        //3. 로그인 실패시 login페이지로 이동
        return "member/login";
    }

    @GetMapping(value="/logout") // localhost/logout
    public String logoutMember(HttpSession session) {
        //세션에 저장된 name과 memer_id 삭제
        session.removeAttribute("name");
        session.removeAttribute("member_id");

        return "redirect:/"; // 로그아웃 성공
    }

    @GetMapping(value="/register") // locaghost/register
    public String register() {
        return "member/register";
    }
    @PostMapping(value="/register")
    public String registerMember(Member member) {
        try {
            //1. 사용자가 입력한 데이터를 등록한다.
            Member registerMember = memberService.registerMember(member);
            //회원가입 성공시 로그인 페이지로 이동
            return "redirect:/login";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping(value="/charge")
    public String charge() {return "member/charge";}
    @PostMapping(value="/charge")
    public String chargeMember(@RequestParam("charge") int charge, HttpSession session) {
        try {
            int memberId = (int) session.getAttribute("member_id");
            Member member = new Member();
            member.setMemberId(memberId);
            memberService.chargeMember(member, charge);
            int chargeBalance = ((int) session.getAttribute("balance")) + charge;
            session.setAttribute("balance", chargeBalance);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "member/charge";
    }
}
