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

const users = [
  {
    name: 'danylo',
    password: '1234',
    email: 'danylohenriique@gmail.com',
    telephone: '21991891624',
    id: randomUUID()
  }
]

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

server.get('/', function (req, res) {
  return res.render('index', { message: false })
})

server.get('/index', (req, res) => {
  //req.query: Query string
  //console.log(req.query)
  return res.render('index', { message: false })
})

server.get('/cadastro', (req, res) => {
  //req.query: Query string
  //console.log(req.query)
  return res.render('cadastro', { userAlreadyRegisered: false })
})

server.get('/tela', (req, res) => {
  if (req.session.login) {
    return res.render('tela', {
      name: req.session.login.name,
      password: req.session.login.password,
      email: req.session.login.email,
      telephone: req.session.login.telephone,
      id: req.session.login.id
    })
  } else {
    return res.render('index')
  }
})

server.post('/login', (req, res) => {
  const userNameForm = req.body.user
  const passwordForm = req.body.password

  const user = users.find(
    user => user.email === userNameForm || user.telephone === userNameForm
  )

  if (users.length === 0) {
    return res.send('Nenhum usuario cadastrado')
  } else if (user === undefined) {
    console.log('usuario nao encontrado')
    return res.send('UserNotFound')
  } else if (
    (userNameForm === user.email || userNameForm === user.telephone) &&
    passwordForm === user.password
  ) {
    console.log('login efetuado')

    req.session.login = user

    res.send('logado')
  } else {
    console.log('erro de senha')
    return res.send('ErrorUserPassword')
  }
})

server.post('/cadastrar', (req, res) => {
  console.clear(true)

  const name = req.body.name
  const password = req.body.password
  const email = req.body.email
  const telephone = req.body.telephone

  const emailAlreadyRegister = users.find(user => user.email === email)
  const telephoneAlreadyRegister = users.find(
    user => user.telephone === telephone
  )

  if (
    emailAlreadyRegister == undefined &&
    telephoneAlreadyRegister == undefined
  ) {
    const user = {
      name,
      password,
      email,
      telephone,
      id: randomUUID()
    }

    users.push(user)
    console.log(users)

    return res.send('registerSucess')
  } else if (emailAlreadyRegister != undefined) {
    return res.send('emailAlreadyRegister')
  } else if (telephoneAlreadyRegister != undefined) {
    return res.send('telephoneAlreadyRegister')
  }
})

server.post('/', (req, res) => {
  console.log(req.body.name)
})

//ligar o servidor
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
