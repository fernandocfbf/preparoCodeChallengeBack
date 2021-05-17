var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  console.log("oi")
  res.json({resp: "ola"})
  res.end()
})

module.exports = router;