;(() => {
   const currentURL = location.href
   const urlObj = new URL(currentURL)
   const params = urlObj.searchParams
   const q = params.get('q')
   if (q) {
      // 검색기능을 엔터키로 쳤을 때 대응
      window.location = `./menu.html?query=${q}&language=ko-KR&page=1`
   }
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