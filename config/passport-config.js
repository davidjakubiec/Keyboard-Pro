const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys')
const User = require('../server/models/mongoModel');

//we want to use the google api to authenticate people
//we need client id and client secret
passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('passport callback function fired', new Date())
    // console.log(profile)
    new User({
      user: profile.displayName,
      googleId: profile.id
    }).save()
    .then((newUser) => {
      console.log('new user created: ' + newUser)
    })
    .catch((error) => {
      console.error('Error saving user: ', error)
    })

    // Check if the user exists in your database, create one if not.
    // Call done() to complete the authentication process.
  }
));

module.exports = passport;

