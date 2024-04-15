;(() => {
   const currentURL = location.href
   const urlObj = new URL(currentURL)
   const params = urlObj.searchParams
   const q = params.get('q')
   if (q) {
      // 검색기능을 엔터키로 쳤을 때 대응
      window.location = `./menu.html?query=${q}&language=ko-KR&page=1`
   }

   // 헤더 만들기
   $('header').append(`
      <!-- nav 바 -->
            <nav class="navbar navbar-dark nav__bg">
               <div class="container">
                  <a class="navbar-brand" href="./index.html"
                     ><img src="./image/logo.png" alt="로고"/>   
                  </a>
                  <form class="d-flex" role="search">
                     <label for="q"></label>
                     <input
                        class="form-control me-2 head-search"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        id="q"
                        name="q"
                        alt="검색창"
                     />
                     <a class="searchBtn" alt="검색창">Search</a>
                  </form>
                  <button
                     class="navbar-toggler"
                     type="button"
                     data-bs-toggle="offcanvas"
                     data-bs-target="#offcanvasDarkNavbar"
                     aria-controls="offcanvasDarkNavbar"
                     aria-label="Toggle navigation"
                  >
                     <span class="navbar-toggler-icon"></span>
                  </button>
                  <div
                     class="offcanvas offcanvas-end text-bg-dark nav__bg"
                     tabindex="-1"
                     id="offcanvasDarkNavbar"
                  >
                     <div class="offcanvas-header">
                        <button
                           type="button"
                           class="btn-close btn-close-white"
                           data-bs-dismiss="offcanvas"
                           aria-label="Close"
                        ></button>
                     </div>
                     <div class="offcanvas-log">
                        <a href="./register.html" class="log__btn">
                           회원가입
                        </a>
                        <a href="./login.html" class="log__btn"> 로그인</a>
                     </div>
                     <hr />
                     <div class="offcanvas-body">
                        <ul
                           class="navbar-nav justify-content-end flex-grow-1 pe-3"
                        >
                           <li class="nav-item">
                              <a
                                 class="nav-link active"
                                 aria-current="page"
                                 href="./menu.html?site=now_playing&page=1"
                                 >현재 상영중</a
                              >
                           </li>
                           <li class="nav-item">
                              <a
                                 class="nav-link active"
                                 aria-current="page"
                                 href="./menu.html?site=popular&page=1"
                                 >인기 영화</a
                              >
                           </li>
                           <li class="nav-item">
                              <a
                                 class="nav-link active"
                                 aria-current="page"
                                 href="./menu.html?site=top_rated&page=1"
                                 >최고 평점</a
                              >
                           </li>
                           <li class="nav-item">
                              <a
                                 class="nav-link active"
                                 aria-current="page"
                                 href="./menu.html?site=upcoming&page=1"
                                 >개봉 예정</a
                              >
                           </li>
                           
                        </ul>
                     </div>
                  </div>
               </div>
               </nav>
               `)
   $('footer').append(` <div>
               <div class="container foot">
                  <div >
                     <img src="./image/logo_big.png" alt="로고" />
                  </div>
                  <div>
                  <br/>
                     <p>
                        Address: Guro, Seoul, South Korea | Email:
                        wsu063@gmail.com |
                     </p>
                     <p>Copyright ⓒ 2024. Sangun Won. All rights reserved.</p>

                  </div>
                                       <div class="logo">
                     <img src="./image/gaming_cat.png" alt="로고" />
                     <img src="./image/cheonan.png" alt="로고" />
                     <img src="./image/Wolf.gif" alt="로고"/>

                     </div>   
               </div>
            </div>`)

   var h_search = $('.head-search').val()
   var searchURL = `https://api.themoviedb.org/3/search/movie?query=${h_search}&language=ko-KR&page=1`

   $('.head-search').keyup(() => {
      h_search = $('.head-search').val()
      searchURL = `https://api.themoviedb.org/3/search/movie?query=${h_search}&language=ko-KR&page=1`
      $('.searchBtn').attr(
         'href',
         `./menu.html?query=${h_search}&language=ko-KR&page=1`
      )
   })
   $('.head-search').attr(
      'href',
      `./menu.html?query=${h_search}&language=ko-KR&page=1`
   )

   $('.searchBtn').click(() => {
      if (!h_search) {
         alert('값을 입력해주세요.')
      } else {
         searchURL = `https://api.themoviedb.org/3/search/movie?query=${h_search}&language=ko-KR&page=1`
      }
   })
})()
