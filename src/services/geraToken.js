function geraToken(secret, userId) {

  //faz um import do json web token
  const jwt = require('jsonwebtoken')

  //secret é a senha do servidor usada para criar uma assinatura
  //digital. Expira em 1h.
  const token = jwt.sign({userId: userId}, secret, {expiresIn: 3600} )
  
  return token
}

module.exports = geraToken