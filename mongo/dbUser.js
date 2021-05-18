var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/preparoCodeChallenge')

var userSchema = new mongoose.Schema({
  user: String,
  password: String
}, { collection: 'usercollection' }
)

module.exports = { Mongoose: mongoose, UserSchema: userSchema }