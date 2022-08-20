const submitButton = document.getElementById('loginSubmit')
submitButton.addEventListener('click', event => {
  event.preventDefault()

  let inputUser = document.getElementById('inputUser').value
  let inputPassword = document.getElementById('inputPassword').value

  {
  }

  const body = {
    user: inputUser,
    password: inputPassword
  }

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(body)
  }).then(async resp => {
    var status = await resp.text()
    console.log(status)

    if (status == 'ErrorUserPassword' || status == 'UserNotFound') {
      var messageErrorPassword = document.getElementById('messageErrorPassword')
      messageErrorPassword.classList.remove('hidden')
    } else if (status == 'logado') {
      location.href = '../../tela'
    }
  })
})

function validateEmail(email) {
  var chave = /\S+@\S+\.\S+/
  return chave.test(email)
}
