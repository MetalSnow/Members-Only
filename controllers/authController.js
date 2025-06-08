const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { insertUser } = require('../db/userQueries');

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be minimum 3 characters.';

const validateUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 2 })
    .withMessage(`First name ${lengthErr}`),
  ,
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 2 })
    .withMessage(`Last name ${lengthErr}`),
  ,
  body('email').trim().isEmail().withMessage('Please enter a valid email.'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be minimum 5 characters.'),
  body('confirmedPassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Confirmed password does not match.'),
];

const getSignUpPage = asyncHandler((req, res) => {
  res.render('sign-up');
});

const createUser = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('sign-up', {
        errors: errors.array(),
        userInfo: req.body,
      });
    }

    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await insertUser(user, hashedPassword);
    res.send('User signed up successfuly!');
  }),
];

module.exports = { getSignUpPage, createUser };
