;(() => {
   const mainURL = `https://api.themoviedb.org/3/collection/1241?language=ko-KR` // 해리포터
   const mainURL2 = `https://api.themoviedb.org/3/collection/10?language=ko-KR` // 스타워즈
   const mainURL31 = `https://api.themoviedb.org/3/collection/556?language=ko-KR` // 스파이더맨
   const mainURL32 = `https://api.themoviedb.org/3/collection/531241?language=ko-KR` // 스파이더맨
   const mainURL33 = `https://api.themoviedb.org/3/collection/125574?language=ko-KR` // 스파이더맨
   const mainURL34 = `https://api.themoviedb.org/3/collection/573436?language=ko-KR` // 스파이더맨
   const mainURL4 = `https://api.themoviedb.org/3/collection/748?language=ko-KR` // 엑스맨
   const urls = ['now_playing', 'top_rated', 'popular', 'upcoming']
   const showcardThumb = (sorts, num) => {
      for (const sort of sorts) {
         if (sort.poster_path) {
            let imgURL = `https://image.tmdb.org/t/p/w500${sort.poster_path}`
            $(`.sw-main${num}`).append(
               `<div class="swiper-slide"><a href="./detail.html?id=${sort.id}"><img src=${imgURL} alt='포스터'/></a></div>`
            )
            $(`.sw-sub${num}`).append(
               `<div class="swiper-slide"><img src=${imgURL} alt='포스터 썸네일'/></div>`
            )
         }
      }
   }
   const showcardPoster = (sorts, pos) => {
      // 데이터와 위치를 받아서 포스터를 만들어주는 함수.
      for (const sort of sorts) {
         let imgURL = `https://image.tmdb.org/t/p/w500${sort.poster_path}`
         $(`.sw-${pos}`).append(
            `<div class="swiper-slide">
               <a href="./detail.html?id=${sort.id}"><img src=${imgURL} alt="포스터"></a></div>`
         )
      }
   }
   // 메인 포스터 4종
   $.ajax({
      // 메인콜렉션1
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
         const sorts = data.parts
         showcardThumb(sorts, 1)
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
   $.ajax({
      // 메인콜렉션2

      type: 'GET',
      crossDomain: true,
      url: mainURL2,
      dataType: 'json',

      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         const sorts = data.parts
         showcardThumb(sorts, 2)
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
   // 포스터 3
   $.ajax({
      // 메인콜렉션3
      type: 'GET',
      crossDomain: true,
      url: mainURL31,
      dataType: 'json',

      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         const sorts = data.parts
         showcardThumb(sorts, 3)
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
   $.ajax({
      // 메인콜렉션3
      type: 'GET',
      crossDomain: true,
      url: mainURL32,
      dataType: 'json',

      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         const sorts = data.parts
         showcardThumb(sorts, 3)
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
   $.ajax({
      // 메인콜렉션3
      type: 'GET',
      crossDomain: true,
      url: mainURL33,
      dataType: 'json',

      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         const sorts = data.parts
         showcardThumb(sorts, 3)
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
   $.ajax({
      // 메인콜렉션3
      type: 'GET',
      crossDomain: true,
      url: mainURL34,
      dataType: 'json',

      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         const sorts = data.parts
         showcardThumb(sorts, 3)
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })
   // 포스터4
   $.ajax({
      // 메인콜렉션4
      type: 'GET',
      crossDomain: true,
      url: mainURL4,
      dataType: 'json',

      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
      },
      success: function (data) {
         const sorts = data.parts
         showcardThumb(sorts, 4)
      },
      error: function (request, status, error) {
         console.log('code:' + request.status)
         console.log('message:' + request.responseText)
         console.log('error:' + error)
      },
   })

   // 포스터 4종 생성
   for (const url of urls) {
      const showURL = `https://api.themoviedb.org/3/movie/${url}?language=ko-KR&page=1`
      const posName = url.slice(0, 3)
      $.ajax({
         type: 'GET',
         crossDomain: true,
         url: showURL,
         dataType: 'json',
         headers: {
            accept: 'application/json',
            Authorization:
               'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlZDdkZDk2NDBlMDQzNmY1YzBmZDg4NDZhMjdiOCIsInN1YiI6IjY1YjA1ZGY1MTU4Yzg1MDBhYzFkODBhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn3bCYy-I4TsBQwxP3LVdL95s0LT6pvsY2GCURG_uIo',
         },
         success: function (data) {
            var sorts = data.results
            showcardPoster(sorts, posName)
         },
         error: function (request, status, error) {
            console.log('code:' + request.status)
            console.log('message:' + request.responseText)
            console.log('error:' + error)
         },
      })
   }

   var swiper_sub1 = new Swiper('.mySwiper-sub', {
      spaceBetween: 10,
      slidesPerView: 5,
      mousewheel: true,
      freeMode: true,
      watchSlidesProgress: true,
   })
   var swiper_main1 = new Swiper('.mySwiper-main', {
      spaceBetween: 10,
      mousewheel: true,

      effect: 'fade',
      thumbs: {
         swiper: swiper_sub1,
      },
   })
   var swiper_sub2 = new Swiper('.mySwiper-sub2', {
      spaceBetween: 10,
      slidesPerView: 5,
      mousewheel: true,
      freeMode: true,
      watchSlidesProgress: true,
   })
   var swiper_main2 = new Swiper('.mySwiper-main2', {
      spaceBetween: 10,
      mousewheel: true,
      effect: 'fade',
      thumbs: {
         swiper: swiper_sub2,
      },
   })
   var swiper_sub3 = new Swiper('.mySwiper-sub3', {
      spaceBetween: 10,
      slidesPerView: 5,
      mousewheel: true,
      freeMode: true,
      watchSlidesProgress: true,
   })
   var swiper_main3 = new Swiper('.mySwiper-main3', {
      spaceBetween: 10,
      mousewheel: true,
      effect: 'fade',
      thumbs: {
         swiper: swiper_sub3,
      },
   })
   var swiper_sub4 = new Swiper('.mySwiper-sub4', {
      spaceBetween: 10,
      slidesPerView: 5,
      mousewheel: true,
      freeMode: true,
      watchSlidesProgress: true,
   })
   var swiper_main4 = new Swiper('.mySwiper-main4', {
      spaceBetween: 10,
      mousewheel: true,
      effect: 'fade',
      thumbs: {
         swiper: swiper_sub4,
      },
   })
   // 4개 공용
   var swiper_now = new Swiper('.mySwiper-now', {
      slidesPerView: 4,
      spaceBetween: 30,
      grabCursor: true,
   })
})()
