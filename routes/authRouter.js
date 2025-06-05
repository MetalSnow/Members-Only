const { Router } = require('express');
const { getSignUpPage } = require('../controllers/authController');

const authRouter = Router();

authRouter.get('/sign-up', getSignUpPage);

module.exports = authRouter;
