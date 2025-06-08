const { Router } = require('express');
const {
  getIndexPage,
  getMembershipPage,
  grantMembership,
} = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', getIndexPage);
indexRouter.get('/membership', getMembershipPage);
indexRouter.post('/membership', grantMembership);

module.exports = indexRouter;
