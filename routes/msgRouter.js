const { Router } = require('express');
const {
  getMsgForm,
  createMessage,
  deleteMessage,
} = require('../controllers/msgController');
const { isAuth, isAdmin } = require('../middleware/authMiddleware');

const msgRouter = Router();

msgRouter.get('/new-message', isAuth, getMsgForm);
msgRouter.post('/new-message', isAuth, createMessage);
msgRouter.post('/deleteMsg', isAdmin, deleteMessage);

module.exports = msgRouter;
