var elInputSenha = document.querySelector('input[type=password]') //pega o elemento input da senha
var elInputSenhaOlho = document.getElementById('icon-olho') //pega o icone de olho da senha

//adiciona envento de click no icon de olho
elInputSenhaOlho.addEventListener('click', () => {
  //se o input for do tipo password, muda para tipo text e a senha sera exibida

  //tenta rodar o codigo a seguir
  try {
    //se o tipo da senha for password muda para text
    if (elInputSenha.type === 'password') {
      elInputSenha.type = 'text'
    } else {
      //se não, significa que já é text, então muda para password
      elInputSenha.type = 'password'
    }
    //se der erro exibe mensagem de alerta
  } catch (error) {
    alert('Não foi possível mudar o tipo')
  }

  elInputSenhaOlho.classList.toggle('icon-olho-esconder')
  elInputSenhaOlho.classList.toggle('icon-olho')
})
