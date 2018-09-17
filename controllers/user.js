const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = (app, passport) => {

  app.get('/auth/google', passport.authenticate('google',
    {
      scope: ['profile', 'email'],
      callbackURL : '/auth/google/callback',
      accessType: 'offline',
      prompt: 'consent'
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google', {
      callbackURL : '/auth/google/callback'
    }), (req, res) => {
      if(req.user.username){
        res.redirect('/');
      }
      else{
        res.redirect('/user/setup')
      }
    }
  );

  //Finish setting up account
  app.get('/register', (req, res) => {
    res.render('register')
  })

  app.post('/register', (req, res) => {
    User.findOne({username : req.body.username}).then((user) => {
      if(user){
        res.send({err : "Username taken"});
      }else{
        console.log(req.body);
        let newUser = new User();
        newUser.name = req.body.name;
        newUser.username = req.body.username;
        // newUser.age = req.body.age;
        newUser.email = req.body.email;
        newUser.password = newUser.generateHash(req.body.password);
        newUser.save().then((newUser) => {
          // generate a JWT for this user from the user's id and the secret key
          let token = jwt.sign({
            id: newUser.id,
            name : newUser.name,
            username : newUser.username
          }, process.env.JWT_SECRET, { expiresIn: "60 days"});
          res.cookie('token', token);
          res.redirect('/');
        })
      }
    })
  });

  app.get('/login', (req, res) => {
    res.render('login');
  })

  app.post('/login', (req, res) => {
    User.findOne({username : req.body.username}).then((user) => {
      if(!user){
        res.send({err : "No user found with that username"});
      }else if(!user.validPassword(req.body.password)){
        res.send({err : "Invalid password"});
      }else{
        let token = jwt.sign({
          id: user.id,
          name : user.name,
          username : user.username
        }, process.env.JWT_SECRET, { expiresIn: "60 days"});
        res.cookie('token', token);
        res.redirect('/');
      }
    })
  });

  app.get('/api/currentUser', (req, res) => {
    res.send(req.user);
  })

}
