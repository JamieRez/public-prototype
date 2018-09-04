//Dependencies
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

//Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/prototype', () => {
  console.log("Let there be a database");
});

//Application Options
app.set('view engine', 'pug');
app.use(express.static('client'))
app.set('views', './client/views')

//Passport Configuration
require('./services/passport.js');
app.use(passport.initialize());
app.use(passport.session());

//Root Route
app.get('/', (req, res) => {
  res.render('main');
})

//Start
app.listen('3000', () => {
  console.log("And so it began.");
});
