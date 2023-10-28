const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys')
const User = require('../server/models/mongoModel');

passport.serializeUser((user, done) => {
  //will pass off id somewhere else
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

//we want to use the google api to authenticate people
//we need client id and client secret
passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  },
  (accessToken, refreshToken, profile, done) => {
    //check if user already exists in db
    // console.log("profile", profile.displayName)
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if (currentUser) {
        //already have the user
        console.log('user is: ' + currentUser);
        done(null, currentUser);
      } else {
        //create a new user in our db

        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save()
        .then((newUser) => {
          console.log('new user created: ' + newUser)
          done(null, newUser);
        })
        .catch((error) => {
          console.error('Error saving user: ', error)
        })
      }
    })
    .catch((error) => {
      console.log('Error finding User in DB: ', error)
    })
  }
));

module.exports = passport;

