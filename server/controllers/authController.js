const authController = {};

authController.authCheck = (req, res, next) => {
    if (req.user) {
      return next();
    }
    res.redirect('/auth/login')
  };

module.exports = authController;