const asyncHandler = require('express-async-handler');

const getMsgForm = asyncHandler((req, res) => {
  res.render('new-message');
});

const createMessage = asyncHandler(async (req, res) => {
  const message = req.body.message;

  await insertMessage(message);

  res.render('/');
});

module.exports = { getMsgForm, createMessage };
