const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const mongoose = require('mongoose');
const User = require('./models/user');

//Connect to MongoDB
const uri = "mongodb+srv://admin:asauth!2021@cluster0.vqmxe.mongodb.net/asauthdb?retryWrites=true&w=majority";
mongoose.connect(uri)
  .then((result) => { "connected to db" })
  .catch((err) => console.log(err));

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Demo Auth App');
});

server.listen(port, hostname, () => {
  console.log('Server running at http://' +hostname+ ':'+port);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
