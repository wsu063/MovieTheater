package com.example.MovieTheater.util;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@Setter
@Service
public class PagingUtil {
    private int dataCount; // 총 게시물의 갯수
    private int numPerPage; // 페이지당 보여줄 데이터의 갯수
    private int totalPage; // 페이지의 전체 갯수
    private int currentPage = 1; // 현재페이지

    private int start; // 시작페이지
    private int end; // 마지막페이지

    public void resetPaging(int dataCount, int numPerPage) {
        this.dataCount = dataCount;
        this.numPerPage = numPerPage;
        this.totalPage = getPageCount();

        //현재 페이지가 totalPage보다 큰 경우는 있을 수 없으므로
        if(this.currentPage > this.totalPage) this.currentPage = this.totalPage;

        //< 이전 1 2 3 4 5 이후 >
        this.start = (this.currentPage - 1) * numPerPage + 1;
        this.end = this.currentPage * numPerPage;

    }

    public int getPageCount() {
        int pageCount = 0;
        pageCount = dataCount / numPerPage;

        if(dataCount % numPerPage != 0) pageCount++;

        return pageCount;
    }

    //페이징 버튼을 만들어주는 메소드
    public String pageIndexList(String listUrl) {
        //문자열 데이터를 자주 추가하거나 삭제할 때 메모리 낭비 방지를 위해 사용한다.
        StringBuffer sb = new StringBuffer();

        int numPerBlock = 5; // 보여줄 페이지 갯수 보여주는것
        int currentPageSetup; // 이전 버튼에 들어갈 pageNum값
        int page; // 그냥 페이지 숫자를 클릭 했을때 들어갈 pageNum값
        if(currentPage == 0 || totalPage == 0) return ""; // 데이터가 없을때 빈 문자열 리턴.

        //listUrl의 값: /list?searchKey=subject&serachValue=네번째
        if(listUrl.indexOf("?") != -1) {
            //?의 위치를 찾아서 리턴. 없으면 -1. 즉, 검색어(쿼리스트링)이 있다면
            listUrl += "&"; // /list?searchKey=subject&serachValue=네번째&
        } else { //검색어가 없다면
            listUrl += "?"; // /list?
        }

        //1. 이전 버튼 만들기
        // 이전버튼으로 이동할 페이지 = 0
        // currentPage = 6부터 시작, 이전페이지는 5, 10, 15, 20페이지로 이동.
        currentPageSetup = (currentPage / numPerBlock) * numPerBlock;
        if(currentPage % numPerBlock == 0) {
            currentPageSetup = currentPageSetup - numPerBlock;
        }

        // 현재 페이지가 0이 아닐경우, 즉 이전으로 갈 페이지가 있을 경우.
        if(totalPage > numPerBlock && currentPageSetup > 0) {
            sb.append("<li class=\"page-item\">" +
                    "       <a class=\"page-link\" href=\"" + listUrl + "pageNum=" + currentPageSetup + "\" aria-label=\"Previous\">" +
                    "            <span aria-hidden=\"true\">이전</span>" +
                    "       </a>" +
                    " </li>");
        }

        //2. 그냥 페이지 이동 버튼 만들기
        // int page는 그냥 페이지 숫자를 클릭 했을때 들어갈 pageNum값
        page = currentPageSetup + 1;
        while(page <= totalPage && page <= (currentPageSetup + numPerBlock)) {
            if(page == currentPage) {
                //현재 내가 선택한 페이지 일때
                sb.append("<li class=\"page-item active\"><a class=\"page-link\" href=\"" + listUrl +
                        "pageNum=" + page + "\">" + page + "</a></li>");
            } else {
                //현재 내가 선택한 페이지가 아닐 때
                sb.append("<li class=\"page-item\"><a class=\"page-link\" href=\"" + listUrl +
                        "pageNum=" + page + "\">" + page + "</a></li>");
            }
            page++; // 페이지 번호 1씩 증가
        }

        //3. 다음 버튼 만들기
        //다음 페이지는 6, 11, 16, 21로 이동.
        if(totalPage - currentPageSetup > numPerBlock) {
            sb.append("<li class=\"page-item\">" +
                    "     <a class=\"page-link\" href=\"" + listUrl + "pageNum=" + (currentPageSetup + numPerBlock + 1) + "\" aria-label=\"Next\">" +
                    "         <span aria-hidden=\"true\">다음</span>" +
                    "     </a>" +
                    " </li>");
        }

        //4. 버튼 합쳐서 문자열로 리턴
        return  sb.toString();
    }


}
