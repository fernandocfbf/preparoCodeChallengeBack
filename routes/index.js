var express = require('express');
var router = express.Router();
var { encrypt, decrypt } = require('../src/services/crypto')

router.get('/', function (req, res) {
  res.json({resp: "Teste"})
  res.end()
})

router.post('/signUp', async function(req, res){
  const db = require("../mongo/dbUser") //conecta no banco
  //const info = req.body //pega as informações recebidas
  const info = {'user':'fernando', 'password':'teste'}

  const User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection')
  const new_user = new User(info)

  await new_user.save(function (err) {
    if(err){
      console.log("Error! ", err)
    }

    else{
      const db_data = require("../mongo/dbGeneralData")
      const Data =  db_data.Mongoose.model('generalData', db_data.DataSchema, 'generalData')
      new_data = new Data({user: 'fernando'})
      new_data.save() //cria documento inicial no banco de dados gerais

      const db_location = require("../mongo/dbLocationData")
      const Location =  db_location.Mongoose.model('locationData', db_location.LocationSchema, 'locationData')
      new_location = new Location({user: 'fernando'})
      new_location.save() //cria documento inciail no banco de localização
    }
  })

  res.json()
  res.end()
})

router.post('/signIn', async function (req, res){
  const db = require("../mongo/dbUser") //conecta no banco
  //const user_decrypted = decrypt(req.body.user) //desencripta o usuário
  //const password_decrypted = decrypt(req.body.password) //desencripta a senha

  const user = "fernando"
  const password = "teste3"
  const query = await db.Mongoose.model('usercollection', db.UserSchema,
    'usercollection').find({
      user: user,
      password: password 
    }).lean()
  
  var auth = false //valida se o usuário está autenticado
  if(query.length > 0) auth = true

  res.json({'auth': auth})
  res.end()
})

router.post('/upDateDados', async function(req, res){
  const db = require("../mongo/dbGeneralData") //conecta no banco
  const dados = req.body

  const query = await db.Mongoose.model('generalData', db.DataSchema,
  'generalData').findOneAndUpdate(
    {user: dados.user},
    {$set:{
      image: dados.image,
      email: dados.email,
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      telefone: dados.telefone,
      git: dados.git,
      behance: dados.behance,
      linkedin: dados.linkedin
    }}
  ).lean()

  res.end()
})

router.post('/upDateLocation', async function(req, res){
  const db = require("../mongo/dbLocationData")
  const dados = req.body

  const query = await db.Mongoose.model('locationData', db.LocationSchema,
  'locationData').findOneAndUpdate(
    {user: dados.user},
    {$set:{
      cep: dados.cep,
      cidade: dados.cidade,
      estado: dados.estado,
      bairro: dados.bairro,
      endereco: dados.endereco,
      numero: dados.numero,
      complemento: dados.complemento,
    }}
  ).lean()

  res.end()
})

module.exports = router;