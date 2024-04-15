;(() => {
   const currentURL = location.href
   const urlObj = new URL(currentURL)
   const params = urlObj.searchParams
   const site = params.get('site')
   const query = params.get('query')
   var page = Number(params.get('page'))
   if (!page) {
      // 페이지 오류날시 1페이지로 자동 이동
      page = 1
      alert('페이지에 오류가 있습니다.')
   }
   var mainURL = `https://api.themoviedb.org/3/movie/${site}?language=ko-KR&page=${page}`
   const searchURL = `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko-KR&page=${page}`
   // const getAllData = (sorts, page, max_page) => {
   //    // 모든 데이터를 받아 리턴해주는 함수. API가 너무 많은 요청을 한다고 거절한다.
   //    var sorted = sorts
   //    for (let i = 1; i <= max_page; i++) {
   //       // 마지막장까지 모든 데이터를 받는다.
   //       if (page === i) {
   //          // 같은 페이지면 정보가 겹치므로 패스한다.
   //          continue
   //       }
   //       var sortURL = `https://api.themoviedb.org/3/movie/${site}?language=ko-KR&page=${i}`
   //       $.ajax({
   //          type: 'GET',
   //          crossDomain: true,
   //          url: sortURL,
   //          dataType: 'json',
   //          async: true,
   //          headers: {
   //             accept: 'application/json',
   //             Authorization:
   //                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
   //          },
   //          success: function (data) {
   //             for (const result of data.results) {
   //                sorts.push(result)
   //             }
   //          },
   //          error: function (request, status, error) {
   //             console.log('code:' + request.status)
   //             console.log('message:' + request.responseText)
   //             console.log('error:' + error)
   //             return -1
   //          },
   //       })
   //    }
   //    return sorted
   // }
   // const getNextData = (sorts, nxt_page, query) => {
   //    // 더보기 버튼을 누르면 다음 페이지 데이터를 가져오는 함수
   //    var sorted = sorts
   //    var sortURL
   //    if (!query) {
   //       sortURL = `https://api.themoviedb.org/3/movie/${site}?language=ko-KR&page=${nxt_page}`
   //    } else {
   //       sortURL = `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko-KR&page=${nxt_page}`
   //    }
   //    $.ajax({
   //       type: 'GET',
   //       crossDomain: true,
   //       url: sortURL,
   //       dataType: 'json',
   //       async: true,
   //       headers: {
   //          accept: 'application/json',
   //          Authorization:
   //             'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
   //       },
   //       success: function (data) {
   //          for (const result of data.results) {
   //             sorts.push(result)
   //          }
   //       },
   //       error: function (request, status, error) {
   //          console.log('code:' + request.status)
   //          console.log('message:' + request.responseText)
   //          console.log('error:' + error)
   //          return -1
   //       },
   //    })

   //    return sorted
   // }
   const show_result = (site) => {
      // 검색 결과를 보여주는 페이지
      switch (site) {
         case 'now_playing':
            $('.main-left').prepend(
               `<h2 style="text-align: center; color: #e9e9e9;">현재 상영중</h2>`
            )
            break
         case 'popular':
            $('.main-left').prepend(
               `<h2 style="text-align: center;">인기 영화</h2>`
            )

            break
         case 'top_rated':
            $('.main-left').prepend(
               `<h2 style="text-align: center;">최고 평점</h2>`
            )

            break
         case 'upcoming':
            $('.main-left').prepend(
               `<h2 style="text-align: center;">개봉 예정</h2>`
            )
            break
         default:
            $('.main-left').prepend(
               `<h2 style="text-align: center;">${query}</h2>`
            )
      }
   }
   const sorting = (sorts) => {
      // 배열을 정렬해주는 함수
      const sortby = $('#sortby').val()
      switch (sortby) {
         case 'popularity_asc':
            sorts.sort((a, b) => a.popularity - b.popularity)
            break
         case 'popularity_desc':
            sorts.sort((b, a) => a.popularity - b.popularity)
            break
         case 'vote_asc':
            sorts.sort((a, b) => a.vote_average - b.vote_average)
            break
         case 'vote_desc':
            sorts.sort((b, a) => a.vote_average - b.vote_average)
            break
         case 'title_asc':
            sorts.sort((a, b) => {
               var titleA = a.title.toUpperCase()
               var titleB = b.title.toUpperCase()
               if (titleA < titleB) {
                  return -1
               } else if (titleB > titleA) {
                  return 1
               } else return 0
            })

            break
         case 'title_desc':
            sorts.sort((b, a) => {
               var titleA = a.title.toUpperCase()
               var titleB = b.title.toUpperCase()
               if (titleA < titleB) {
                  return -1
               } else if (titleB > titleA) {
                  return 1
               } else return 0
            })
            break
         case 'release_asc':
            sorts.sort((a, b) => {
               const dateA = a.release_date.split('-')
               const dateB = b.release_date.split('-')
               var result
               if (dateA[0] === dateB[0]) {
                  if (dateA[1] === dateB[1]) {
                     result = dateA[2] - dateB[2]
                  } else {
                     result = dateA[1] - dateB[1]
                  }
               } else {
                  result = dateA[0] - dateB[0]
               }
               return result
            })
            break
         case 'release_desc':
            sorts.sort((b, a) => {
               const dateA = a.release_date.split('-')
               const dateB = b.release_date.split('-')
               var result
               if (dateA[0] === dateB[0]) {
                  if (dateA[1] === dateB[1]) {
                     result = dateA[2] - dateB[2]
                  } else {
                     result = dateA[1] - dateB[1]
                  }
               } else {
                  result = dateA[0] - dateB[0]
               }
               return result
            })
            break
      }
   }
   const showcard = (sorts) => {
      // 정렬된 값에 따라 영화카드를 입력하는 함수
      if (sorts.length) {
         for (const result of sorts) {
            if (result.poster_path) {
               let imgURL = `https://image.tmdb.org/t/p/w500${result.poster_path}`
               const dateR = new Date(result.release_date)
               $('.main-right').append(
                  `<div class="card" style="width: 20%;">
                    <a href="./detail.html?id=${result.id}">
                     <img src=${imgURL} width="100%" class="card-img-top" alt="포스터">
                    </a>
                    <div class="card-body">
                     <h2 style="font-size: 0.8rem;font-weight:bold;margin-bottom: 0.2rem;">${
                        result.title
                     }</h2>
                     <p style="color:rgba(0,0,0,.6); font-size: 0.8rem;">${
                        dateR.getMonth() + 1
                     }월 ${dateR.getDate()}일, ${dateR.getFullYear()}</p>
                    </div>
                </div>`
               )
            }
         }
      } else {
         $('.main-right').append(`<p>검색 결과가 없습니다.</p>`)
      }
   }
   const paging = (page, max_page, site) => {
      // 데이터를 받아서 현재 몇페이지인지 확인하고 페이지기능에 넣어준다.
      // 페이지에 따라 데이터를 달리 불러온다.
      // previous버튼은 첫번째 페이지로 이동한다.
      // next버튼은 마지막 페이지로 이동한다.
      if (site) {
         // now_playing / top_rated / popular / upcoming
         if (page === 1) {
            // 현재 페이지가 첫번째 페이지라면 왼쪽, 이전페이지 비활성
            $('#main-page')
               .append(`<li class="page-item disabled"> <a class="page-link" href="./menu.html?site=${site}&page=1">
                <span aria-hidden="true">&laquo;</span></a></li>
                 <li class="page-item disabled" id="first">
                     <a class="page-link" href="./menu.html?site=${site}&page=${page}"alt="${page}">
                  <span id="invisible">X</span></a>
                  </li>
                  <li class="page-item active" id="second"><a class="page-link" href="./menu.html?site=${site}&page=${page}">
                  ${page}</a></li>
                  <li class="page-item" id="third">
                  <a class="page-link" href="${`./menu.html?site=${site}&page=${
                     page + 1
                  }`}">${page + 1}</a>
                  </li>
                  <li class="page-item">
                  <a class="page-link" href="${`./menu.html?site=${site}&page=${max_page}`}">
                     <span aria-hidden="true">&raquo;</span>
                  </a></li>`)
         } else if (page === max_page) {
            // 현재 페이지가 마지막 페이지라면 오른쪽, 다음 페이지 비활성
            $('#main-page').append(`
<li class="page-item "> <a class="page-link" href="./menu.html?site=${site}&page=1">
                <span aria-hidden="true">&laquo;</span></a></li>
                 <li class="page-item " id="first">
                     <a class="page-link" href="${`./menu.html?site=${site}&page=${
                        page - 1
                     }`}">${page - 1}</a>
                  </li>
                  <li class="page-item active" id="second"><a class="page-link" href="./menu.html?site=${site}&page=${page}">
                  ${page}</a></li>
                  <li class="page-item disabled" id="third">
                  <a class="page-link" href="${`./menu.html?site=${site}&page=${
                     page + 1
                  }`}"><span id="invisible">X</span></a>
                  </li>
                  <li class="page-item disabled">
                  <a class="page-link" href="${`./menu.html?site=${site}&page=${max_page}`}">
                     <span aria-hidden="true">&raquo;</span>
                  </a></li>
            `)
         } else {
            $('#main-page').append(
               `<li class="page-item"> <a class="page-link" href="./menu.html?site=${site}&page=1">
                <span aria-hidden="true">&laquo;</span></a></li>
                 <li class="page-item " id="first">
                     <a class="page-link" href="${`./menu.html?site=${site}&page=${
                        page - 1
                     }`}">${page - 1}</a>
                  </li>
                  <li class="page-item active" id="second"><a class="page-link" href="./menu.html?site=${site}&page=${page}">
                  ${page}</a></li>
                  <li class="page-item" id="third">
                  <a class="page-link" href="./menu.html?site=${site}&page=${
                  page + 1
               }">${page + 1}</a>
                  </li>
                  <li class="page-item">
                  <a class="page-link" href="./menu.html?site=${site}&page=${max_page}">
                     <span aria-hidden="true">&raquo;</span>
                  </a></li>`
            )
         }
      } else {
         // 검색시
         if (max_page === 1) {
            // 만약 페이지가 한장이라면 가운데 빼고 전부 비활성
            $('#main-page').append(`
<li class="page-item "> <a class="page-link disabled" href="./menu.html?query=${query}&page=1">
                <span aria-hidden="true">&laquo;</span></a></li>
                 <li class="page-item " id="first">
                     <a class="page-link disabled" href="${`./menu.html?query=${query}&page=${
                        page - 1
                     }`}"><span id="invisible">X</span></a>
                  </li>
                  <li class="page-item active" id="second"><a class="page-link" href="./menu.html?query=${query}&page=${page}">
                  ${page}</a></li>
                  <li class="page-item disabled" id="third">
                  <a class="page-link" href="${`./menu.html?query=${query}&page=${
                     page + 1
                  }`}"><span id="invisible">X</span></a>
                  </li>
                  <li class="page-item disabled">
                  <a class="page-link" href="${`./menu.html?query=${query}&page=${max_page}`}">
                     <span aria-hidden="true">&raquo;</span>
                  </a></li>
            `)
         } else if (page === 1) {
            // 현재 페이지가 첫번째 페이지라면 왼쪽, 이전페이지 비활성
            $('#main-page')
               .append(`<li class="page-item disabled"> <a class="page-link" href="./menu.html?query=${query}&page=1">
                <span aria-hidden="true">&laquo;</span></a></li>
                 <li class="page-item disabled" id="first">
                     <a class="page-link" href="./menu.html?query=${query}&page=${page}"alt="${page}">
                  <span id="invisible">X</span></a>
                  </li>
                  <li class="page-item active" id="second"><a class="page-link" href="./menu.html?query=${query}&page=${page}">
                  ${page}</a></li>
                  <li class="page-item" id="third">
                  <a class="page-link" href="${`./menu.html?query=${query}&page=${
                     page + 1
                  }`}">${page + 1}</a>
                  </li>
                  <li class="page-item">
                  <a class="page-link" href="${`./menu.html?query=${query}&page=${max_page}`}">
                     <span aria-hidden="true">&raquo;</span>
                  </a></li>`)
         } else if (page === max_page) {
            // 현재 페이지가 마지막 페이지라면 오른쪽, 다음 페이지 비활성
            $('#main-page').append(`
<li class="page-item "> <a class="page-link" href="./menu.html?query=${query}&page=1">
                <span aria-hidden="true">&laquo;</span></a></li>
                 <li class="page-item " id="first">
                     <a class="page-link" href="${`./menu.html?query=${query}&page=${
                        page - 1
                     }`}">${page - 1}</a>
                  </li>
                  <li class="page-item active" id="second"><a class="page-link" href="./menu.html?query=${query}&page=${page}">
                  ${page}</a></li>
                  <li class="page-item disabled" id="third">
                  <a class="page-link" href="${`./menu.html?query=${query}&page=${
                     page + 1
                  }`}"><span id="invisible">X</span></a>
                  </li>
                  <li class="page-item disabled">
                  <a class="page-link" href="${`./menu.html?query=${query}&page=${max_page}`}">
                     <span aria-hidden="true">&raquo;</span>
                  </a></li>
            `)
         } else {
            $('#main-page').append(
               `<li class="page-item"> <a class="page-link" href="./menu.html?query=${query}&page=1">
                <span aria-hidden="true">&laquo;</span></a></li>
                 <li class="page-item" id="first">
                     <a class="page-link" href="${`./menu.html?query=${query}&page=${
                        page - 1
                     }`}">${page - 1}</a>
                  </li>
                  <li class="page-item active" id="second"><a class="page-link" href="./menu.html?query=${query}&page=${page}">
                  ${page}</a></li>
                  <li class="page-item" id="third">
                  <a class="page-link" href="./menu.html?query=${query}&page=${
                  page + 1
               }">${page + 1}</a>
                  </li>
                  <li class="page-item">
                  <a class="page-link" href="./menu.html?query=${query}&page=${max_page}">
                     <span aria-hidden="true">&raquo;</span>
                  </a></li>`
            )
         }
      }
   }
   if (query) {
      // 검색해서 들어왔으면 URL을 바꿔준다.
      mainURL = searchURL
   }
   $.ajax({
      type: 'GET',
      crossDomain: true,
      url: mainURL,
      dataType: 'json',
      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         show_result(site)
         const max_page = data.total_pages // 마지막 페이지
         var sorted = document.getElementById('sortby')
         var sorts = data.results // 정렬할 데이터
         // 정렬 기준값이 변경되면 그에 맞춰 정렬해주는 이벤트
         sorted.addEventListener('change', () => {
            sorting(sorts)
            $('.main-right').empty()
            showcard(sorts)
         })
         sorting(sorts)
         showcard(sorts)
         paging(page, max_page, site)
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
})()
