const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const { randomUUID } = require('crypto')
const fs = require('fs')
const { json } = require('express')

/* 
  GET => Buscar uma informação
  POST => inserir (criar) uma informação
  PUT => alterar uma informação
  DELETE => remover um dado
  PATCH => alterar uma informação espeficica
*/

//criando objetos onde estão sendo armazenados os usuarios por enquanto
const users = [
  {
    name: 'danylo',
    password: '1234',
    email: 'danylohenriique@gmail.com',
    telephone: '21991891624',
    id: randomUUID()
  }
]

//----------------------------------------CONFIGURAÇÕES------------------------------------------

//path
server.engine('html', require('ejs').renderFile)
server.set('view engine', 'html')
server.use(express.static('public'))
server.set('views', path.join(__dirname, 'views'))

//json
server.use(express.json())

//bodyparser
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

//session
server.use(
  session({
    secret: 'ffasfafagf1g6a1fa616',
    resave: true,
    saveUninitialized: true
  })
)

//----------------------------------------ROTAS------------------------------------------

//rota chamada apos o usuario colocar o nome do site no navegador
//rota para a pagina de login
server.get('/', function (req, res) {
  return res.render('index')
})

//rota para a pagina de login
server.get('/index', (req, res) => {
  return res.render('index')
})

//rota para a pagina de cadastro
server.get('/cadastro', (req, res) => {
  return res.render('cadastro', { userAlreadyRegisered: false })
})

//rota para a tela inicial apos o login
server.get('/tela', (req, res) => {
  //se uma sessao esta ativada
  if (req.session.login) {
    //retorna a tela inicial com as informações do usuario
    return res.render('tela', {
      name: req.session.login.name,
      password: req.session.login.password,
      email: req.session.login.email,
      telephone: req.session.login.telephone,
      id: req.session.login.id
    })
    //se a sessao nao estiver ativada manda o usuario para a tela de login, para que o mesmo passa entrar na sua conta e ativar a sessao
  } else {
    return res.render('index')
  }
})

//----------------------------------------LOGIN E CADASTRO------------------------------------------

//porta chamada apos o usuario clicar no botao de login da pagina de login
server.post('/login', (req, res) => {
  //pega o usuario e senha mandados pelo body do front end
  const userNameForm = req.body.user
  const passwordForm = req.body.password

  //procura no objeto usado provisoriamente como banco de dados
  //se existe algum telefone ou email igual ao dado de login digitado pelo usuario
  //Cria objeto user como indefinido se nada foi encontrado
  const user = users.find(
    user => user.email === userNameForm || user.telephone === userNameForm
  )

  //se o banco de dados estiver vazio enviar para o frontend mensagem que nao tem ninguem cadastrado
  if (users.length === 0) {
    return res.send('Nenhum usuario cadastrado')

    //se o user for indefinido é por que nao foi encontrado usuario com telefone ou email indicado pelo cliente
  } else if (user === undefined) {
    console.log('usuario nao encontrado')
    return res.send('UserNotFound')

    //verifica se o email e senha digitados pelo usuario sao iguais ao email e senha do usuario ja cadastrado no banco de dados
    //se forem iguais cria uma sessao com os dados do usuario e manda para o frontend que o usuario foi logado
  } else if (
    (userNameForm === user.email || userNameForm === user.telephone) &&
    passwordForm === user.password
  ) {
    console.log('login efetuado')

    req.session.login = user

    res.send('logado')

    //se nao envia para o front end que a senha estava errada
  } else {
    console.log('erro de senha')
    return res.send('ErrorUserPassword')
  }
})

//função chamada apos o usuario clicar no botao de cadastrar da pagina de cadastro
server.post('/cadastrar', (req, res) => {
  //pega os dados digitados pelo cliente no site
  const name = req.body.name
  const password = req.body.password
  const email = req.body.email
  const telephone = req.body.telephone

  //verifica se o email e o telefone ja foi cadastrado anteriormente
  const emailAlreadyRegister = users.find(user => user.email === email)
  const telephoneAlreadyRegister = users.find(
    user => user.telephone === telephone
  )

  //se o email nem telefone nao tiverem sido cadastrados anteriormente, entao
  if (
    emailAlreadyRegister == undefined &&
    telephoneAlreadyRegister == undefined
  ) {
    //cria um objeto user com os dados do usuario
    const user = {
      name,
      password,
      email,
      telephone,
      id: randomUUID() //adiciona um ID aleatorip
    }

    users.push(user) //coloca o usuario dentro do objeto users (banco de dados temporario)
    console.log(users)

    return res.send('registerSucess') //retorna ao front end que o sucesso do cadastro
  } else if (emailAlreadyRegister != undefined) {
    //se o email já estiver cadastrado
    return res.send('emailAlreadyRegister') //retorna ao front end que o email ja foi cadastrado anteriormente
  } else if (telephoneAlreadyRegister != undefined) {
    return res.send('telephoneAlreadyRegister') //retorna ao front end que o telefone ja foi cadastrado anteriormente
  }
})

//----------------------------------------ATIVAR SERVVIDOR------------------------------------------

//ligar o servidor na porta 3000
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
