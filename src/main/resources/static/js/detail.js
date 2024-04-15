;(() => {
   const currentURL = location.href
   const urlObj = new URL(currentURL)
   const params = urlObj.searchParams
   const id = params.get('id')
   const movieURL = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`
   const actorURL = `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`
   const posterURL = `https://api.themoviedb.org/3/movie/${id}/images?language=en`
   const videoURL = `https://api.themoviedb.org/3/movie/${id}/videos?language=ko-KR`
   const similarURL = `https://api.themoviedb.org/3/movie/${id}/similar?language=ko-KR&page=1`

   const showcardCastor = (sorts) => {
      if (sorts.length) {
         for (const sort of sorts) {
            if (sort.profile_path && sort.known_for_department === 'Acting') {
               // 프로필 사진이 있는 배우만 적용한다.
               $('.cast-swiper').append(`
               <div class="swiper-slide">
               <div class="card">
               <a class= "clickable" data-bs-toggle="modal" data-bs-target="#actor-modal${sort.id}">
                  <img src="https://image.tmdb.org/t/p/w500${sort.profile_path}" class="card-img-top" alt="프로필" />
                  </a>
                  <div class="card-body">
                  <h2 style="font-size: 0.8rem;font-weight:bold;margin-bottom: 0.2rem;">${sort.name}</h2>
                     <p style="color:rgba(0,0,0,.6); font-size: 0.8rem; ">${sort.character}</p>
                  </div>
                  </div></div>`)
            }
         }
      }
   }
   const showcardPoster = (sorts) => {
      var counter = 0
      if (sorts.posters.length) {
         for (const sort of sorts.posters) {
            $('.poster-swiper').append(`
            <div class="swiper-slide">
               <div class="card img-only">
                  <a class=" clickable" data-bs-toggle="modal" data-bs-target="#poster-modal${counter}">
                     <img src="https://image.tmdb.org/t/p/w500${sort.file_path}" alt="포스터" class="card-img-top"/>
                  </a></div></div>`)
            // 포스터 사진을 확대해주는 모달
            $('.extra-info').prepend(`
                     <div
                        class="modal fade"
                        id="poster-modal${counter}"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabindex="-1"
                        aria-labelledby="poster-modal${counter}"
                        aria-hidden="true"
                     >
                        <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                           <div class="modal-content">
                              <div class="modal-body">
                              <img src="https://image.tmdb.org/t/p/w500${sort.file_path}" alt="포스터" width="100%" class="clickable" data-bs-dismiss="modal"/>
                              </div>
                           </div>
                        </div>`)
            counter++
         }
      }
      if (sorts.backdrops.length) {
         for (const sort of sorts.backdrops) {
            $('.backdrop-swiper').append(`<div class="swiper-slide">
               <div class="card img-only">
                  <a class="clickable" data-bs-toggle="modal" data-bs-target="#backdrop-modal${counter}">
                     <img src="https://image.tmdb.org/t/p/w500${sort.file_path}" alt="백드랍" class="card-img-top"/>
                  </a></div></div>`)
            // 포스터 사진을 확대해주는 모달
            $('.extra-info').prepend(`
                     <div
                        class="modal fade"
                        id="backdrop-modal${counter}"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabindex="-1"
                        aria-labelledby="backdrop-modal${counter}"
                        aria-hidden="true"
                     >
                        <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                           <div class="modal-content">
                              <div class="modal-body"><img src="https://image.tmdb.org/t/p/w500${sort.file_path}" alt="백드랍" width="100%" class="clickable" data-bs-dismiss="modal" /></div>
                           </div>
                        </div>`)
            counter++
         }
      }
   }
   const showvideo = (sorts) => {
      if (sorts.length) {
         for (const sort of sorts) {
            $('.video-swiper').append(`<div class="swiper-slide">
               <iframe src= https:/www.youtube.com/embed/${sort.key} width="auto" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>`)
         }
      }
   }
   const showcardCredit = (sorts, id) => {
      // 출연작 정보
      for (const sort of sorts) {
         if (sort.poster_path) {
            $(`.actor-modal${id} > .modal-body > .swiper > .swiper-wrapper`)
               .append(`
                      <div class="swiper-slide">
               <div class="card">
               <a href="./detail.html?id=${sort.id}">
                  <img src="https://image.tmdb.org/t/p/w500${sort.poster_path}" class="card-img-top" alt="프로필" />
                  </a>
                  <div class="card-body">
                     <p style="color:rgba(0,0,0,.6); font-size: 0.8rem; ">${sort.character}</p>
                  </div>
                  </div></div>
                `)
         }
      }
   }
   const showsimilar = (sorts) => {
      for (const sort of sorts) {
         if (sort.poster_path) {
            $('.similar-swiper').append(`
                      <div class="swiper-slide">
               <div class="card img-only">
               <a href="./detail.html?id=${sort.id}">
                  <img src="https://image.tmdb.org/t/p/w500${sort.poster_path}" class="card-img-top" alt="프로필" />
                  </a>
                  </div></div>
                `)
         }
      }
   }

   // 영화 정보를 가져오는 ajax
   $.ajax({
      type: 'GET',
      crossDomain: true,
      url: movieURL,
      dataType: 'json',

      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         $('.backdrop').css({
            'background-image': `url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`,
            'background-size': 'cover',
         })

         $('.cover-inner > div:nth-child(1)').prepend(
            ` <a class= "clickable" data-bs-toggle="modal" data-bs-target="#main-poster">
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="포스터" class="card-img-top" /></a>`
         )
         $('.extra-info').prepend(`
                     <div
                        class="modal fade"
                        id="main-poster"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabindex="-1"
                        aria-labelledby="main-poster"
                        aria-hidden="true"
                     >
                        <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                           <div class="modal-content">
                              <div class="modal-body">
                              <img class="clickable" src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="포스터" width="100%" data-bs-dismiss="modal"/>
                              </div>
                           </div>
                        </div>`)

         const rdate = new Date(data.release_date)
         // 제목, 발매연도
         $('.cover-inner > div:nth-child(2)').prepend(
            `<h2 style="font-size: 2.2rem; font-weight: 700">${data.title}
            <span style="font-weight: 400; opacity: 0.8">(${rdate.getFullYear()})</span>
            </h2>`
         )
         $('.detail-top').append(
            `<p><span class="age"></span><span>${rdate.getFullYear()}/${
               rdate.getMonth() + 1
            }/${rdate.getDate()} (${
               data.original_language
            })</span><span class="gl"></span><p>`
         )
         // 나이제한여부
         if (!data.adult) {
            $('.age').append(`ALL`)
         } else {
            $('.age').append(`Adult`)
         }
         const genresum = []
         for (const genre of data.genres) {
            genresum.push(genre.name)
         }
         $('.gl').append(`▶${genresum.join(', ')}`)
         const runtimeH = (data.runtime - (data.runtime % 60)) / 60
         $('.gl').append(`▶${runtimeH}h ${data.runtime % 60}m`)

         $('.detail-mid').append(
            '<p class="rate"></p> <p class="budget"></p><p class="tagline"></p>'
         )
         $('.rate').append(
            `<i class="fa-solid fa-star"></i> ${data.vote_average.toFixed(
               1
            )} / ${data.vote_count}명 참여<br>`
         )
         $('.budget').append(
            `<i class="fa-solid fa-sack-dollar"></i> ${data.budget} <br>`
         )
         $('.tagline').append(`${data.tagline}`)
         $('.detail-bottom').append(
            `<p class="overview">개요<br /></p><p>${data.overview}</p>`
         )
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
   // 주요 출연진 정보를 가져오는 ajax
   // + 출연진 모달을 만든다.
   $.ajax({
      type: 'GET',
      crossDomain: true,
      url: actorURL,
      dataType: 'json',
      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         // 주요 출연진
         $('.cast').append(`<h2 class="info">주요 출연진</h2>
                  <div class="swiper mySwiper">
                     <div class="swiper-wrapper extra-swiper cast-swiper"></div>
                  </div>`)
         var sorts = data.cast
         showcardCastor(sorts)
         // 배우 모달
         for (const sort of sorts) {
            const castorURL = `https://api.themoviedb.org/3/person/${sort.id}?language=ko-KR`
            $.ajax({
               type: 'GET',
               crossDomain: true,
               url: castorURL,
               dataType: 'json',
               headers: {
                  accept: 'application/json',
                  Authorization:
                     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
               },
               success: function (data) {
                  // 배우 정보를 띄워주는 모달
                  $('.extra-info').append(`
                     <div
                        class="modal fade"
                        id="actor-modal${data.id}"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabindex="-1"
                        aria-labelledby="actor-modal${data.id}"
                        aria-hidden="true"
                     >
                        <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-centered modal-dialog-scrollable">
                           <div class="modal-content actor-modal${data.id}">
                              <div class="modal-body">
                           <img src="https://image.tmdb.org/t/p/w500${data.profile_path}" 
                           alt="프로필" width="100%" class="clickable" data-bs-dismiss="modal"/>
                              <h2 class="info">${data.name}</h2>
                              <p class="info">출생지</p>
                              <p class="modal-detail">${data.place_of_birth}</p>
                              <p class="info">생일</p>
                              <p class="modal-detail">${data.birthday}</p>
                              </div>
                              <div class="modal-footer">
                        <a class="log__btn" data-bs-dismiss="modal">Close</a>
                        </div>
                           </div>
                        </div>`)
                  var id = sort.id
                  const detailURL = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=kr-KR`
                  // 배우 상세정보
                  $.ajax({
                     type: 'GET',
                     crossDomain: true,
                     url: detailURL,
                     dataType: 'json',
                     headers: {
                        accept: 'application/json',
                        Authorization:
                           'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
                     },
                     success: function (data) {
                        // 배우 출연작
                        $(`.actor-modal${id} > .modal-body`).append(`
                        <h2 class="info">출연작</h2>
                     <div class="swiper mySwiper5">
                        <div
                           class="swiper-wrapper extra-swiper detail-swiper"
                        ></div>
                     </div>
                        `)
                        var sorts = data.cast
                        showcardCredit(sorts, id)
                        var swiper5 = new Swiper('.mySwiper5', {
                           spaceBetween: 10,
                           slidesPerView: 'auto',
                           mousewheel: true,
                           rewind: true,
                        })
                     },
                     error: function (request, status, error) {
                        console.log('code:' + request.status)
                        console.log('message:' + request.responseText)
                        console.log('error:' + error)
                     },
                  })
               },
               error: function (request, status, error) {
                  console.log('code:' + request.status)
                  console.log('message:' + request.responseText)
                  console.log('error:' + error)
               },
            })

            var swiper = new Swiper('.mySwiper', {
               spaceBetween: 10,
               slidesPerView: 5,
               mousewheel: true,
               rewind: true,
            })
         }
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
   // 영화 포스터 정보를 가져오는 ajax
   $.ajax({
      type: 'GET',
      crossDomain: true,
      url: posterURL,
      dataType: 'json',
      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         // 주요 포스터
         $('.media').prepend(`<div class="media-poster">
                     <h2 class="info">포스터</h2>
                     <div class="swiper mySwiper2">
                        <div
                           class="swiper-wrapper extra-swiper poster-swiper"
                        ></div>
                     </div>
                     <h2 class="info">백드랍</h2>
                     <div class="swiper mySwiper3">
                        <div
                           class="swiper-wrapper extra-swiper backdrop-swiper"
                        ></div>
                     </div>
                  </div>`)
         var sorts = data
         showcardPoster(sorts)
         var swiper2 = new Swiper('.mySwiper2', {
            slidesPerView: 'auto',
            spaceBetween: 10,
            mousewheel: true,
            rewind: true,
         })
         var swiper3 = new Swiper('.mySwiper3', {
            slidesPerView: 'auto',
            spaceBetween: 40,
            mousewheel: true,
            rewind: true,
         })
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
   // 영화 비디오 정보를 가져오는 ajax
   $.ajax({
      type: 'GET',
      crossDomain: true,
      url: videoURL,
      dataType: 'json',
      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         // 영화 비디오
         $('.media').append(`<div class="media-video">
                     <h2 class="info">비디오</h2>
                     <div class="swiper mySwiper4">
                        <div
                           class="swiper-wrapper extra-swiper video-swiper"
                        ></div>
                     </div>
                  </div>`)
         var sorts = data.results
         showvideo(sorts)
         var swiper4 = new Swiper('.mySwiper4', {
            slidesPerView: 1,
            spaceBetween: 10,
            mousewheel: true,
            rewind: true,
         })
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
   // 유사 영화를 가져오는 ajax
   $.ajax({
      type: 'GET',
      crossDomain: true,
      url: similarURL,
      dataType: 'json',
      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         // 유사 영화
         $('.similar').append(`
                     <h2 class="info">비슷한 영화</h2>
                     <div class="swiper mySwiper6">
                        <div
                           class="swiper-wrapper extra-swiper similar-swiper"
                        ></div>
                  </div>`)
         var sorts = data.results
         showsimilar(sorts)
         var swiper6 = new Swiper('.mySwiper6', {
            slidesPerView: 5,
            spaceBetween: 10,
            mousewheel: true,
            rewind: true,
         })
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
})()
