const asyncHandler = require('express-async-handler');
const { insertMessage } = require('../db/messageQueries');

const getMsgForm = asyncHandler((req, res) => {
  res.render('new-message');
});

const createMessage = asyncHandler(async (req, res) => {
  const { title, message } = req.body;
  const userId = req.user.id;

  await insertMessage(userId, title, message);

  res.redirect('/');
});

module.exports = { getMsgForm, createMessage };
