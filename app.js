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

// view engine setup
app.set('view engine', 'ejs');

// listen for requests
app.listen(port);

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/signup', (req, res) => {
  res.render('signup');
});
app.get('/login', (req, res) => {
  res.render('login');
});

app.use((req, res) => {
  res.status(404).render('404');
})

/* Delete?
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
*/



module.exports = app;
