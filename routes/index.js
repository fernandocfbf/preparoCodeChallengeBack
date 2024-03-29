var express = require('express');
var router = express.Router();
var localStorage = require('localStorage')
var geraToken = require('../src/services/geraToken')
var validaToken = require('../src/services/validaToken');

router.get('/', function (req, res) {
  res.json({ resp: "Teste" })
  res.end()
})

router.post('/signUp', async function (req, res) {
  const db = require("../mongo/dbUser") //conecta no banco
  const info = req.body //pega as informações recebidas

  const query = await db.Mongoose.model('usercollection', db.UserSchema,
    'usercollection').find({
      user: info.user
    }).lean()

  var complete = false

  if (query.length == 0) {
    complete = true

    const User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection')
    const new_user = new User(info)

    await new_user.save(function (err) {
      if (err) {
        console.log("Error! ", err)
      }

      else {
        const db_data = require("../mongo/dbGeneralData")
        const Data = db_data.Mongoose.model('generalData', db_data.DataSchema, 'generalData')
        new_data = new Data({ user: info.user })
        new_data.save() //cria documento inicial no banco de dados gerais

        const db_location = require("../mongo/dbLocationData")
        const Location = db_location.Mongoose.model('locationData', db_location.LocationSchema, 'locationData')
        new_location = new Location({ user: info.user })
        new_location.save() //cria documento inciail no banco de localização
      }
    })
  }

  res.json({ complete: complete })
  res.end()
})

router.post('/signIn', async function (req, res) {
  const db = require("../mongo/dbUser") //conecta no banco

  const user = req.body.user
  const password = req.body.password

  const query = await db.Mongoose.model('usercollection', db.UserSchema,
    'usercollection').find({
      user: user,
      password: password
    }).lean()

  var auth = false //valida se o usuário está autenticado

  if (query.length > 0) {
    auth = true //usuário autenticado
    const secret = 'XZ4789#&@-*?;' //chave de segurança
    const token = geraToken(secret, query[0]._id) //gera token de auth

    localStorage.setItem('x-access-token', token) //salva token de auth
    localStorage.setItem('user', user) //salva o usuário que efetuou login
  }

  res.json({ 'auth': auth })
  res.end()
})

router.post('/upDateDados', async function (req, res) {
  const db = require("../mongo/dbGeneralData") //conecta no banco
  const user = localStorage.getItem('user')
  const dados = req.body

  const query = await db.Mongoose.model('generalData', db.DataSchema,
    'generalData').findOneAndUpdate(
      { user: user },
      {
        $set: {
          image: dados.image,
          email: dados.email,
          nome: dados.nome,
          sobrenome: dados.sobrenome,
          telefone: dados.telefone,
          git: dados.git,
          behance: dados.behance,
          linkedin: dados.linkedin
        }
      }
    ).lean()

  res.end()
})

router.post('/upDateLocation', async function (req, res) {
  const db = require("../mongo/dbLocationData")
  const user = localStorage.getItem('user')
  const dados = req.body

  const query = await db.Mongoose.model('locationData', db.LocationSchema,
    'locationData').findOneAndUpdate(
      { user: user },
      {
        $set: {
          cep: dados.cep,
          cidade: dados.cidade,
          estado: dados.estado,
          bairro: dados.bairro,
          endereco: dados.endereco,
          numero: dados.numero,
          complemento: dados.complemento,
        }
      }
    ).lean()
  res.end()
})

router.get('/location', async function (req, res) {
  const db = require("../mongo/dbLocationData")
  const user = localStorage.getItem('user')

  const query = await db.Mongoose.model('locationData', db.LocationSchema,
    'locationData').find({ user: user }).lean()

  res.json({ 'info': query[0] })
  res.end()
})

router.get('/dados', async function (req, res) {
  const db = require("../mongo/dbGeneralData")
  const user = localStorage.getItem('user')

  const query = await db.Mongoose.model('generalData', db.DataSchema,
    'generalData').find({ user: user }).lean()

  res.json({ 'info': query[0] })
  res.end()
})

router.post("/upDateEmail", async function (req, res) {
  const db = require("../mongo/dbGeneralData")
  const user = localStorage.getItem('user')
  const dados = req.body

  const query = await db.Mongoose.model('generalData', db.DataSchema,
    'generalData').findOneAndUpdate(
      { user: user },
      {
        $set: {
          email: dados.email
        }
      }
    ).lean()
  res.end()
})

router.get('/validaToken', validaToken)

router.get('/logOut', function (req, res) {
  localStorage.clear() //limpa o localStorage
  res.end()
})

module.exports = router;