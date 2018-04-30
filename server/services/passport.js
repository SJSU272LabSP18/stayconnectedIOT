const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var Postgress = require('../db');
const keys = require('../config/keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  var sql = 'Select * FROM site_ops.user where site_ops.user.user_id=' + id;
  Postgress.fetchData(function(error, results) {
    if (error) {
      return;
    } else {
      done(null, results);
    }
  }, sql);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
