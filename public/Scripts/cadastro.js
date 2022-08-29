//Codigo para enviar dados de cadastro do usuario para o servidor e agir de maneira correspondente ao que for responiddo
//O codigo é ativado quando o usuario clica no botao de enviar, chamando a função de verificação
//logo apos, se tudo certo, chama a função de registro]
//a função de registro é responsável por enviar o dados do usuario via POST para o servidor e agir de maneira correspondente a resposta do servidor

var form = document.getElementById('form')
var buttonRegister = document.getElementById('buttonRegister')
var messageErrorPassword = document.getElementById('messageErrorPassword')
var messageErrorEmail = document.getElementById('messageErrorEmail')
var messageErrorTelephone = document.getElementById('messageErrorTelephone')

function autentication() {
  // ---------a fazerres
  //verificação se nome so tem letras
  //verificação senha iguais
  //verificação de senha forte o suficiente
  //verificação de email valido
  // ---------

  register()
}

function register() {
  buttonRegister.addEventListener('click', event => {
    event.preventDefault() //nao carregar a pagina ao enviar form

    //pegar valores do formulario
    var inputName = document.getElementById('inputName').value
    var inputPassword = document.getElementById('inputPassword').value
    var inputConfirmPassword = document.getElementById(
      'inputConfirmPassword'
    ).value
    var inputEmail = document.getElementById('inputEmail').value
    var inputTelephone = document.getElementById('inputTelephone').value

    //verifica se a senha e a confirmação da senha sao iguais
    if (inputPassword === inputConfirmPassword) {
      //criando objeto apartir dos dados do formulario
      const body = {
        name: inputName.toLowerCase(), //bota o nome todo em minusculo
        password: inputPassword,
        email: inputEmail.toLowerCase(), //bota o nome todo em minusculo
        telephone: inputTelephone.replace(/[^0-9]/g, '') //remove os () e - do telefone
      }

      //função para mandar requisição ao servidor
      fetch('/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(body) //envia para o backend o objeto BODY convertido em json

        //definição do que fazer apos a resposta do servidor
      }).then(async resp => {
        var status = await resp.text()

        //se o servidor responder que o usuario foi registrado com sucesso, adicionar mensagem de sucesso
        if (status == 'registerSucess') {
          alert('cadastrado com sucesso')

          messageErrorTelephone.classList.add('hidden') //remover mensagem de senhas iguais
          messageErrorEmail.classList.add('hidden') //remover mensagem de senhas iguais

          //apos algun segundos direcionar o usuario para tela de login
          var timeOut
          return (timeOut = setTimeout(() => {
            location.href = '../../index'
          }, 4000000))

          //se o servidor responder que o email ja foi cadastrado antes, adicionar alerta de erro
        } else if (status == 'emailAlreadyRegister') {
          alert('erro, email ja cadastrado')
          x
          //se o servidor responder que o telefone ja foi cadastrado antes, adicionar alerta de erro
        } else if (status == 'telephoneAlreadyRegister') {
          alert('erro, telefone ja cadastrado')
          x
        }
      })
    } else {
      //senha e confirmação da senha sao diferentes
      return messageErrorPassword.classList.remove('hidden') //mostra mensagem de senhas iguais
      alert('senhas diferentes')
    }
  })
}

//adiciona mascara no input do telefone
$(document).ready(function () {
  $('#inputTelephone').mask('(99) 99999-9999')
})

// //verifica se é um email
// function validateEmail(email) {
//   var chave = /\S+@\S+\.\S+/
//   return chave.test(email)
// }
