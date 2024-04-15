package com.example.MovieTheater.controller;

import com.example.MovieTheater.dto.Comment;
import com.example.MovieTheater.dto.Review;
import com.example.MovieTheater.service.CommentService;
import com.example.MovieTheater.service.ReviewService;
import com.example.MovieTheater.util.PagingUtil;
import com.example.MovieTheater.util.PhotoUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ReviewController {
    @Autowired
    ReviewService reviewService;

    @Autowired
    PagingUtil pagingUtil;

    @Autowired
    PhotoUtil photoUtil;

    @Autowired
    CommentService commentService;

    @GetMapping(value="/review")
    public String review() {return "review";}

    @RequestMapping(value="/list",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String list(HttpSession session, HttpServletRequest request, Model model) {

        try {
            String pageNum = request.getParameter("pageNum");
            pagingUtil.setCurrentPage(1); //페이지 번호 항상 1로 우선 초기화
            //현재 페이지의 값을 바꿔준다.
            if(pageNum != null) pagingUtil.setCurrentPage(Integer.parseInt(pageNum));

            int memberId = (int) session.getAttribute("member_id");
            String searchKey = request.getParameter("searchKey");
            String searchValue = request.getParameter("searchValue");

            if(searchValue == null) {
                //검색어가 없다면
                searchKey = "subject"; // 검색 키워드의 디폴트값 subject
                searchValue = ""; // 검색어의 디폴트값 빈문자열
            } else {
                searchValue = URLDecoder.decode(searchValue, "UTF-8");
            }

            Map map = new HashMap();
            map.put("memberId", memberId);
            map.put("searchKey", searchKey);
            map.put("searchValue", searchValue);

            //1. 전체 게시물의 갯수 가져오기
            int dataCount = reviewService.getDataCount(map);

            //2. 페이징 처리를 한다(전단계)
            // numPerPage: 페이지당 보여줄 게시물 목록의 갯수
            pagingUtil.resetPaging(dataCount, 5);

            map.put("start", pagingUtil.getStart());
            map.put("end", pagingUtil.getEnd());

            //3. 페이징 처리할 리스트를 가지고 온다.
            List<Review> lists = reviewService.getReviewList(map);

            //4. 검색어에 대한 쿼리스트링을 만든다.
            String param = "";
            String listUrl = "/list";
            //상세페이지로 이동하는 URL
            String articleUrl = "/view?pageNum=" + pagingUtil.getCurrentPage();

            //검색어가 null이 아니고 빈 문장도 아니라면 param 설정
            if(searchValue != null && !searchValue.equals("")) {
                param = "searchKey=" + searchKey;
                param += "&searchValue=" + URLEncoder.encode(searchValue, "UTF-8");
            }

            // 검색어가 있다면
            if(!param.equals("")) {
                //listurl을 /list?searchKey=subject&searchValue=네번째 로 바꿔준다.
                listUrl += "?" + param;
                //articleUrl을 //view?pageNum=1&searchKey=subject&searchValue=네번째 로 바꿔준다.
                articleUrl += "&" + param;
            }

            //5. 페이징 버튼을 만들어준다.
            String pageIndexList = pagingUtil.pageIndexList(listUrl);

            model.addAttribute("lists",lists); // DB에서 가져온 전체 게시물 리스트
            model.addAttribute("articleUrl",articleUrl); // 상세페이지로 이동하기 위한 url
            model.addAttribute("pageIndexList",pageIndexList); // 페이징 버튼
            model.addAttribute("dataCount",dataCount); // 게시물의 전체 갯수
            model.addAttribute("searchKey",searchKey); // 검색키워드
            model.addAttribute("searchValue",searchValue); // 검색어

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "review/list";
    }


    @GetMapping(value="/view")
    public String view(HttpSession session, HttpServletRequest request, Model model) {
        try {
            int reviewId = Integer.parseInt(request.getParameter("reviewId"));
            String pageNum = request.getParameter("pageNum");
            String searchKey = request.getParameter("searchKey");
            String searchValue = request.getParameter("searchValue");

            if(searchValue != null) {
                searchValue = URLDecoder.decode(searchValue, "UTF-8");
            }

            //1. 조회수 늘리기
            reviewService.updateHitCount(reviewId);

            //2. 게시물 데이터 가져오기
            Review review = reviewService.getReviewDetail(reviewId);

            //가져온 게시물이 없다면
            if(review == null)
                return "redirect:/list?pageNum=" + pageNum;

            String params = "pageNum=" + pageNum;

            // 검색어가 있다면
            if(searchValue != null && !searchValue.equals("")) {
                params += "&searchKey=" + searchKey;
                params += "&searchValue=" + URLEncoder.encode(searchValue, "UTF-8");
            }


            // 코멘트
            //1. 코멘트 리스트 받아오기
            int memberId = (int) session.getAttribute("member_id");
            Map map = new HashMap<>();
            map.put("reviewId", reviewId);
            map.put("memberId", memberId);
            List<Comment> commentList = commentService.getComment(map);
            
            //2. 데이터 넣어주기
            model.addAttribute("commentList", commentList);
            model.addAttribute("review", review);
            model.addAttribute("params", params);
            model.addAttribute("pageNum", pageNum);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }


        return "review/view";
    }


    @GetMapping(value="/write")
    public String write() {
        return "review/write";
    }
    @PostMapping(value= "/insert")
    public String insertReview(Review review, HttpSession session) {
        try {
            //1. 세션에서 사용자 member_id 가져오기
            Object memberId = session.getAttribute("member_id");

            if(memberId == null) {
                return "redirect:/login"; // 세션 만료시 로그인 페이지로 이동
            } else {
                review.setMemberId((int) memberId); // insert 하기 전 memberid 값 넣어줌
                reviewService.insertReview(review); // 2. 포스트에 insert 해주는 서비스 호출
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return "redirect:/list";
    }

    @GetMapping(value="/edit")
    public String edit(HttpServletRequest request, Model model, Map map) {
        try {
            int reviewId = Integer.parseInt(request.getParameter("reviewId"));
            String pageNum = request.getParameter("pageNum");
            String searchKey = request.getParameter("searchKey");
            String searchValue = request.getParameter("searchValue");

            //게시물 데이터 가져오기
            Review review = reviewService.getReviewDetail(reviewId);

            //게시물이 없으면 list 페이지로 이동
            if(review == null)
                return "redirect:/list?pageNum=" + pageNum;

              //movie id가져와서 write에 for구문돌리기
//            //1. 전체 영화 갯수 가져오기
//            int dataCount = reviewService.getMovieCount(map); // 0 ~ datacount 개만큼 있다.
//
//            //3. 페이징 처리할 리스트를 가지고 온다.
//            List<Review> lists = reviewService.getReviewList(map);

            String param = "pageNum=" + pageNum;

            if(searchValue != null && !searchValue.equals("")) {
                searchValue = URLDecoder.decode(searchValue, "UTF-8");
                //검색어가 있다면
                param += "&searchKey=" + searchKey;
                param += "&searchValue=" + URLEncoder.encode(searchValue, "UTF-8"); //컴퓨터의 언어로 인코딩
            }

            model.addAttribute("review", review );
            model.addAttribute("param",param );
            model.addAttribute("pageNum", pageNum);
            model.addAttribute("searchKey", searchKey );
            model.addAttribute("searchValue",searchValue );

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return "review/edit";
    }

    @PostMapping(value = "/update")
    public String update(Review review, HttpSession session, HttpServletRequest request) {
        String param = "";
        try {
            String pageNum = request.getParameter("pageNum");
            String searchKey = request.getParameter("searchKey");
            String searchValue = request.getParameter("searchValue");
            Object memberId = session.getAttribute("member_id");
            param = "?reviewId=" + review.getReviewId() + "&pageNum=" + pageNum;

            if(searchValue != null && !searchValue.equals("")) {
                searchValue = URLDecoder.decode(searchValue, "UTF-8");
                //검색어가 있다면
                param += "&searchKey=" + searchKey;
                param += "&searchValue=" + URLEncoder.encode(searchValue, "UTF-8"); //컴퓨터의 언어로 인코딩
            }

            if(memberId == null) {
                return "redirect:/login"; // 세션 만료시 로그인 페이지로 이동
            } else {
                reviewService.updateReview(review); // 포스트 update 서비스 호출

            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return "redirect:/view" + param;
    }

    @DeleteMapping(value = "/delete/{reviewId}")
    public @ResponseBody ResponseEntity deletePost(@PathVariable("reviewId") int reviewId, HttpSession session) {
        try {

            Object memberId = session.getAttribute("member_id");

            if(memberId == null) {
                return new ResponseEntity<String>("삭제 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
            } else {
                reviewService.deleteReview(reviewId);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("삭제 실패. 관리자에게 문의하세요.", HttpStatus.BAD_REQUEST);
        }
        //ResponseEntity<첫번째 매개변수의 타입>(result결과, response상태코드)
        //HttpsStatus.OK 일때는 ajax의 success함수로 결과가 출력된다.
        return new ResponseEntity<Integer>(reviewId, HttpStatus.OK );
    }

    //서버에 이미지 업로드 request
    @PostMapping(value = "/reviewImgUpload")
    public String reviewImgUpload(MultipartHttpServletRequest request, Model model) {
        String uploadPath = photoUtil.ckUpload(request);

        model.addAttribute("uploaded", true);
        model.addAttribute("url", uploadPath);
        return "jsonView"; // model에 있는 값들이 json 객체 형식으로 forward된다.
    }

    @PostMapping(value="/comment")
    public String insertComment(Comment comment, HttpSession session, HttpServletRequest request) {
        String param = "";
        try {
            String pageNum = request.getParameter("pageNum");
            String searchKey = request.getParameter("searchKey");
            String searchValue = request.getParameter("searchValue");
            Object memberId = session.getAttribute("member_id");
            String reviewId = request.getParameter("reviewId");
            param = "?reviewId=" + reviewId + "&pageNum=" + pageNum;

            if(searchValue != null && !searchValue.equals("")) {
                searchValue = URLDecoder.decode(searchValue, "UTF-8");
                //검색어가 있다면
                param += "&searchKey=" + searchKey;
                param += "&searchValue=" + URLEncoder.encode(searchValue, "UTF-8"); //컴퓨터의 언어로 인코딩
            }

            if(memberId == null) {
                return "redirect:/login"; // 세션 만료시 로그인 페이지로 이동
            } else {
                comment.setReviewId(Integer.parseInt(reviewId));
                comment.setMemberId((Integer) memberId);
               commentService.insertComment(comment); // 포스트 update 서비스 호출

            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return "redirect:/view" + param;
    }

    @DeleteMapping(value= "/deleteComment/{commentId}")
    public @ResponseBody ResponseEntity deleteComment(@PathVariable("commentId") int commentId, HttpSession session) {
        try {
            int memberId = (int) session.getAttribute("member_id");
            int memberIdByComment = commentService.getCommentById(commentId).getMemberId();

            if(memberId != memberIdByComment) { // 로그인된 아이디와 코멘트 작성아이디가 같지않다면
                return new ResponseEntity<String>("삭제 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
            } else {
                commentService.deleteComment(commentId);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<Integer>(commentId, HttpStatus.OK);
    }
}
