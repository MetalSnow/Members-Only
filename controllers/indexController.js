const asyncHandler = require('express-async-handler');
const { assignMembership } = require('../db/userQueries');
require('dotenv').config();

const getIndexPage = asyncHandler((req, res) => {
  res.render('index');
});

const getMembershipPage = asyncHandler((req, res) => {
  res.render('membership');
});

const grantMembership = asyncHandler(async (req, res) => {
  const userSecret = req.body.passcode;

  if (process.env.MEMBERSHIP_PASSCODE === userSecret) {
    await assignMembership(req.user.id);
    return res.render('membership', { message: 'Membership granted ✅' });
  }

  res.render('membership', {
    message: '❌ Incorrect passcode. Please try again.',
  });
});

module.exports = { getIndexPage, getMembershipPage, grantMembership };
