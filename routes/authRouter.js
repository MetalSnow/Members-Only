const { Router } = require('express');
const { getSignUpPage, createUser } = require('../controllers/authController');

const authRouter = Router();

authRouter.get('/sign-up', getSignUpPage);
authRouter.post('/sign-up', createUser);

module.exports = authRouter;
