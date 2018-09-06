const User = require('../models/User');
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

  app.post('/user/setup', (req, res) => {
    User.findById(req.user._id).then((user) => {
      user.name = req.body.name;
      user.username = req.body.username;
      user.interests = req.body.interests;
      user.save().then(() => {
        res.redirect('/');
      })
    })
  })

}
