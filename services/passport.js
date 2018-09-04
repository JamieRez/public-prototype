const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id})
    if (existingUser) {
      return done(null, existingUser);
    }else{
      // make a new record
      let user = await new User({
        googleId: profile.id,
        email: profile.emails[0].value,
      }).save()
      done(null, user);
    }
});

passport.use(googleStrategy);
