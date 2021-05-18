var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/preparoCodeChallenge')

var locationSchema = new mongoose.Schema({
  user: String, 
  cep: String,
  cidade: String,
  estado: String,
  bairro: String,
  endereco: String,
  numero: Number,
  complemento: String
}, { collection: 'locationData' }
)

module.exports = { Mongoose: mongoose, LocationSchema: locationSchema }