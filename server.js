//Dependencies
const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const exphbs  = require('express-handlebars');
const port = process.env.PORT || '3000';
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const io = require('socket.io')(server);
require('dotenv').config();

//Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/prototype', () => {
  console.log("Let there be a database");
});

//Application Options
app.use(express.static('client'))
app.set('views', __dirname + '/client/views')
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir:'client/views/layouts',
  partialsDir:'client/views/partials',
  extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// check that a user is logged in
let checkAuth = function (req, res, next) {
  if (typeof req.cookies.token === 'undefined' || req.cookies.token === null) {
    req.user = null;
  } else {
    // if the user has a JWT cookie, decode it and set the user
    var token = req.cookies.token;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
}
app.use(checkAuth);


//Passport Configuration
require('./services/passport.js');
app.use(passport.initialize());
app.use(passport.session());

//Routes
//Root controllers
require('./controllers/root')(app);
//User Controller
require('./controllers/user')(app, passport);

//Sockets
let onlineUsers = {};
io.on('connection', (socket) => {
  require('./sockets/user')(socket, io, onlineUsers)

  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
    io.emit("userLeft", socket.id);
  })

})

//Start
server.listen(port, () => {
  console.log("And so it began.");
});
