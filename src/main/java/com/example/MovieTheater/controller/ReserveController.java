package com.example.MovieTheater.controller;

import com.example.MovieTheater.dto.Movie;
import com.example.MovieTheater.dto.Reserve;
import com.example.MovieTheater.dto.Screen;
import com.example.MovieTheater.dto.Seat;
import com.example.MovieTheater.service.MovieService;
import com.example.MovieTheater.service.ReserveService;
import com.example.MovieTheater.service.ScreenService;
import com.example.MovieTheater.service.SeatService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ReserveController {
    @Autowired
    ReserveService reserveService;
    @Autowired
    MovieService movieService;

    @Autowired
    ScreenService screenService;

    @Autowired
    SeatService seatService;

    @RequestMapping(value="/reserve", method={RequestMethod.GET, RequestMethod.POST})
    public String reserveSeat(Reserve reserve, HttpSession session, Model model) { // 예약 처리
            try {
                Object memberId = session.getAttribute("member_id");
                int balnace = (int) session.getAttribute("balance");
                
                if(memberId == null) { // 로그인이 안됬으면 로그인 화면으로 이동
                    return "redirect:/login";
                } else {
                    //화면 구성을 위해 필요한 것들
                    Map map = new HashMap();
                    map.put("memberId", memberId);
                    //리스트들을 가져온다.
                    List<Movie> movieList = movieService.getMovieList(); // 영화목록
                    List<Screen> screenList = screenService.getScreenList(); // 상영관 목록
                    List<Seat> seatList = seatService.getSeatListAll(); // 모든 좌석 가져오기



                    model.addAttribute("movieList", movieList); // DB에서 가져온 전체 영화 리스트
                    model.addAttribute("screenList", screenList);
                    model.addAttribute("seatList", seatList);

                    
                    //잔액 체크?
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            return "reserve/reserve";
    }
    @PostMapping(value="/reservation")
    public String insertReserve(Reserve reserve, HttpSession session, Model model) {
        try {
            reserve.setMemberId((Integer) session.getAttribute("member_id")); // 넘겨주나 안넘겨주나 확인해야됨
            reserveService.insertReserve(reserve); // 예약한다.
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "redirect:/reserview"; // 예약 성공하면 예약리스트로 이동
    }

    @RequestMapping(value="/reserview", method = {RequestMethod.GET, RequestMethod.POST})
    public String viewReserve(Reserve reserve, HttpSession session, Model model) {
        // 예매한 리스트 보기
        //예매한 리스트를 보기위해서 필요한것 from session: member_id

        try {
            int memberId = (int) session.getAttribute("member_id"); // memberId의 예매리스트

            Map map = new HashMap();
            map.put("memberId", memberId);
            map.put("reserveId", reserve.getReserveId());

            //1. 전체 예매 갯수 가져오기. 페이징할거 아니면 필요 없는듯 하다.
            int dataCount = reserveService.getDataCount(map);

            //2. 리스트를 가져온다
            List<Reserve> reserveList = reserveService.getReserveList(map); // 예매 리스트
            
            //3. model에 데이터를 넘겨준다.
            model.addAttribute("reserveList", reserveList); // DB에서 가져온 전체 예매 리스트
            model.addAttribute("dataCount", dataCount); // 예매한 전체 갯수


        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return "reserve/reserview";
    }

    @DeleteMapping(value  = "/cancel/{reserveId}")
    public @ResponseBody ResponseEntity cancelReserve(@PathVariable("reserveId") int reserveId, HttpSession session) {
            try {
                Object memberId = session.getAttribute("member_id");
//                if(memberId == null) {
//                    return new ResponseEntity<String>("삭제 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
//                } else {
                    reserveService.cancelReserve(reserveId);
//                }
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<String>("삭제 실패.", HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<Integer>(reserveId, HttpStatus.OK);
    }
}
