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

//Passport Configuration
require('./services/passport.js');
app.use(passport.initialize());
app.use(passport.session());

//Root Route
app.get('/', (req, res) => {
  if(req.user){
    res.render('./layouts/main', {user: req.user});
  }else{
    res.render('./layouts/main');
  }
})

//Routes
//User Controller
require('./controllers/user')(app, passport);

//Sockets
io.on('connection', (socket) => {
  require('./sockets/user')(socket, io)
})

//Start
server.listen(port, () => {
  console.log("And so it began.");
});
