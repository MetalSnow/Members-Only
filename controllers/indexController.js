const asyncHandler = require('express-async-handler');
const {
  assignMembership,
  assignAdmin,
  getAllAdmins,
} = require('../db/userQueries');
const { getAllMessages } = require('../db/messageQueries');
require('dotenv').config();

const getIndexPage = asyncHandler(async (req, res) => {
  const messages = await getAllMessages();
  res.render('index', { messages: messages });
});

const getMembershipPage = asyncHandler((req, res) => {
  res.render('membership');
});

const getAdminPage = asyncHandler(async (req, res) => {
  const admins = await getAllAdmins();
  res.render('admin', { admins: admins });
});

const getAboutPage = asyncHandler((req, res) => {
  res.render('about');
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

const grantAdmin = asyncHandler(async (req, res) => {
  const userSecret = req.body.passcode;
  const admins = await getAllAdmins();

  if (process.env.ADMIN_PASSCODE === userSecret) {
    await assignAdmin(req.user.id);
    return res.render('admin', { message: 'Admin granted ✅' });
  }

  res.render('admin', {
    message: '❌ Incorrect passcode. Please try again.',
    admins: admins,
  });
});

module.exports = {
  getIndexPage,
  getMembershipPage,
  grantMembership,
  getAdminPage,
  grantAdmin,
  getAboutPage,
};
