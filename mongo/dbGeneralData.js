var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/preparoCodeChallenge')

var dataSchema = new mongoose.Schema({
  user: String,
  image: String,
  email: String,
  nome: String,
  sobrenome: String,
  telefone: String,
  git: String,
  behance: String,
  linkedin: String
}, { collection: 'generalData' }
)

module.exports = { Mongoose: mongoose, DataSchema: dataSchema }