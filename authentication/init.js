const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')

const user = {
  username: 'root',
  password: 'root',
  id: 1
}

function findUser (username, callback) {
  console.log("username",username);
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  // findUser(username, cb)  
  findUser(username, function(err, username) {
    if(err){
      console.log("Error");
    }else{
      console.log("Success ================");
      
    }
    cb(err, username);
  });
})

function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      findUser(username, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        if (password !== user.password  ) {
          return done(null, false)
        }
        return done(null, user)
      })
    }
  ))
  console.log("I came upto here");
  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
