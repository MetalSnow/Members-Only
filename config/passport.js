const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { userService } = require('../db/userQueries');

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await userService.findUserByEmail(email);

        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
          return done(null, false, { message: 'Incorrect password' });
        }

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
