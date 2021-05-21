var localStorage = require('localStorage')
var jwt = require('jsonwebtoken')

async function validaToken(req, res, next) {

  const secret = 'XZ4789#&@-*?;'
  const token = localStorage.getItem('x-access-token')

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      //não autorizado
      return res.json({auth: false}).end()
    }

    else {
      //autorizado
      res.json({auth: true}).end()
    }
  })
}

module.exports = validaToken