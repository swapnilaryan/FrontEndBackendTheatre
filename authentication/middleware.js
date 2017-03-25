function authenticationMiddleware () {
  return function (req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login_n')
  }
}

module.exports = authenticationMiddleware
