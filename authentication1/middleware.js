function authenticationMiddleware () {
  return function (req, res, next) {
    console.log(req.isAuthenticated(), req._passport);
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login_n')
  }
}

module.exports = authenticationMiddleware;


// var user = req._passport.session.user;
// var returnMessage = {};
// returnMessage.message = user.Message;
// returnMessage.error = user.Error;
// returnMessage.status = user.Status;
// console.log("+++++++++++==============;;",req.session.destroy());
// res.json(returnMessage);
// // return 'yo';
// // res.redirect('/login_n')