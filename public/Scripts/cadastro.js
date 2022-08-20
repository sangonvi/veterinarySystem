var form = document.getElementById('form')

var buttonRegister = document.getElementById('buttonRegister')
var messageErrorPassword = document.getElementById('messageErrorPassword')
var messageErrorEmail = document.getElementById('messageErrorEmail')
var messageErrorTelephone = document.getElementById('messageErrorTelephone')

function autentication() {
  //verificação se nome so tem letras
  //verificação senha iguais
  //verificação de senha forte o suficiente
  //verificação de email valido
  register()
}

function register() {
  buttonRegister.addEventListener('click', event => {
    event.preventDefault() //nao carregar a pagina ao enviar form

    console.log('aqui')

    //pegar valores do formulario
    var inputName = document.getElementById('inputName').value
    var inputPassword = document.getElementById('inputPassword').value
    var inputConfirmPassword = document.getElementById(
      'inputConfirmPassword'
    ).value
    var inputEmail = document.getElementById('inputEmail').value
    var inputTelephone = document.getElementById('inputTelephone').value

    console.log(inputPassword, inputConfirmPassword)

    if (inputPassword === inputConfirmPassword) {
      //criando objeto apartir dos dados do formulario
      const body = {
        name: inputName.toLowerCase(),
        password: inputPassword,
        email: inputEmail.toLowerCase(),
        telephone: inputTelephone.replace(/[^0-9]/g, '')
      }

      console.log(body)

      fetch('/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(body)
      }).then(async resp => {
        var status = await resp.text()
        console.log(status)

        if (status == 'registerSucess') {
          alert('cadastrado com sucesso')

          messageErrorTelephone.classList.add('hidden') //remover mensagem de senhas iguais
          messageErrorEmail.classList.add('hidden') //remover mensagem de senhas iguais

          var timeOut
          return (timeOut = setTimeout(() => {
            location.href = '../../index'
          }, 4000000))
        } else if (status == 'emailAlreadyRegister') {
          alert('erro')

          messageErrorTelephone.classList.add('hidden') //remover mensagem de senhas iguais
          return messageErrorEmail.classList.remove('hidden') //mostra mensagem de senhas iguais
        } else if (status == 'telephoneAlreadyRegister') {
          alert('erro')

          messageErrorEmail.classList.add('hidden') //remover mensagem de senhas iguais
          return messageErrorTelephone.classList.remove('hidden') //mostrar mensagem de senhas iguais
        }
      })
    } else {
      return messageErrorPassword.classList.remove('hidden') //mostra mensagem de senhas iguais
      alert('senhas diferentes')
    }
  })
}

$(document).ready(function () {
  $('#inputTelephone').mask('(99) 99999-9999')
})
