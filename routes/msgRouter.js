const { Router } = require('express');
const {
  getMsgForm,
  createMessage,
  deleteMessage,
} = require('../controllers/msgController');

const msgRouter = Router();

msgRouter.get('/new-message', getMsgForm);
msgRouter.post('/new-message', createMessage);
msgRouter.post('/deleteMsg', deleteMessage);

module.exports = msgRouter;
