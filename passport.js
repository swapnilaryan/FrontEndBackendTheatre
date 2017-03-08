/**
 * Created by !!.Swapnil..Aryan.!! on 22-Feb-17.
 */
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "126030407918627",
    clientSecret: "b939974333f8a79344c8974767554a12",
    callbackURL: "http://localhost:8000/api/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    var result = {
      "accessToken":accessToken,
      "refreshToken":refreshToken,
      "profile":profile,
      "done":done

    };
    console.log(result);
    return result;
  }
));
