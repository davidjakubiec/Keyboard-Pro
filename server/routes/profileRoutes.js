const router = require('express').Router();
const authController = require('../controllers/authController')

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    return next();
  };

router.get('/', authCheck, (req, res) => {
    // console.log(req.user)
    req.session.user = req.user;
    res.send('you are logged in, this is your profile -' + req.user.username);

    // res.render('profile', {user:req.user} );
})

module.exports = router;