//Codigo para fazer o login do usuario apartir dos dados digitados no formulario
//O codigo faz envio dos dados para o servidor via Post
//alem de realizar ações de respostar para o usuario a depender se o servidor logar o usuario ou nao

//coloca um evento de click no botao de login
const submitButton = document.getElementById('loginSubmit')
submitButton.addEventListener('click', event => {
  event.preventDefault() //evita que a pagina recarregue

  //pega o valor digitado do input pelo usuario do login e senha
  let inputUser = document.getElementById('inputUser').value
  let inputPassword = document.getElementById('inputPassword').value

  //verifica se o login digitado é email, se nao for email, entao tem que ser telefone
  if (validateEmail(inputUser) == false) {
    inputUser = inputUser.replace(/[^a-z0-9]/gi, '') //retirado caracteres especias do telefone se forem digitados
  }

  //cria objetos que armazena valor digitado pelo usuario nos inputs
  const body = {
    user: inputUser,
    password: inputPassword
  }

  //função para fazer requisição via POST
  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(body) //envia para o backend o objeto BODY convertido em json

    //definição do que fazer apos a resposta do servidor
  }).then(async resp => {
    var status = await resp.text()
    console.log(status)

    //se a resposta for erro de senha errado ou entao de usuario nao encontrado
    if (status == 'ErrorUserPassword' || status == 'UserNotFound') {
      console.log('usuario ou senha invalidos')

      //se a resposta do servidor for de que o usario foi logado
    } else if (status == 'logado') {
      location.href = '../../tela' //manda para a primeira tela pos login
    }
  })
})

//verifica se é um email
function validateEmail(email) {
  var chave = /\S+@\S+\.\S+/
  return chave.test(email)
}
