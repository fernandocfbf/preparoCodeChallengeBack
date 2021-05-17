var path = require('path');
const express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var indexRouter = require('../routes/index');

const port = 3003
const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.get('/', (req, res)=>{
  res.send("API funcionando")
})

app.listen(port, () => {
  console.log("Backend is running on port ", port)
})

module.exports = app;
