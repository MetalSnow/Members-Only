const { Router } = require('express');
const {
  getSignUpPage,
  createUser,
  getLogInPage,
  logoutUser,
} = require('../controllers/authController');
const passport = require('../config/passport');

const authRouter = Router();

authRouter.get('/sign-up', getSignUpPage);
authRouter.post('/sign-up', createUser);

authRouter.get('/log-in', getLogInPage);
authRouter.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureFlash: true,
  })
);

authRouter.get('/log-out', logoutUser);

module.exports = authRouter;
