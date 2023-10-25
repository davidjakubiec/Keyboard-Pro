const express = require('express');
const passport = require('../../config/passport-config'); // Import Passport configuration
const router = express.Router();
const authController = require('../controllers/authController')


router.get('/login', (req,res) => {
    res.render('login');
})

router.get('/logout', (req,res) => {
    res.send('logging out')
})

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// router.get('/auth/google/redirect',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, redirect to a secure route or send a response.
//     res.redirect('/dashboard');
//   }
// );

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you reached the callback uri')
})

module.exports = router;
