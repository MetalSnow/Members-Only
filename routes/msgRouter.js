const { Router } = require('express');
const { getMsgForm, createMessage } = require('../controllers/msgController');

const msgRouter = Router();

msgRouter.get('/new-message', getMsgForm);
msgRouter.post('/new-message', createMessage);

module.exports = msgRouter;
