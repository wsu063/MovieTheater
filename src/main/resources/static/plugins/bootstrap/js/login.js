;(() => {
   const submit = document.querySelector('#submitButton')
   const email = document.querySelector('#email')
   const pwd = document.querySelector('#pwd')
   const noemail = document.querySelector('.noemail')
   const nopwd = document.querySelector('.nopwd')

   submit.addEventListener('click', () => {
      noemail.style.display = 'none'
      nopwd.style.display = 'none'

      if (!email.value) {
         noemail.style.display = 'block'
      } else {
         if (!emailCheck(email.value)) {
            alert('이메일 형식에 맞지 않습니다.')
         }
      }
      if (!pwd.value) {
         nopwd.style.display = 'block'
      } else {
         if (!pwdCheck(pwd.value)) {
            alert(
               '비밀번호는 특수문자/문자/숫자 포함 형태의 8~15자리 이내입니다.'
            )
         }
      }
      function emailCheck(email) {
         const reg =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
         return reg.test(email)
      }
      function pwdCheck(pwd) {
         //특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식 ( 3 가지 조합)
         const reg =
            /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
         return reg.test(pwd)
      }
   })
})()
