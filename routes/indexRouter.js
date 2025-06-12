const { Router } = require('express');
const {
  getIndexPage,
  getMembershipPage,
  grantMembership,
  grantAdmin,
  getAdminPage,
} = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', getIndexPage);
indexRouter.get('/membership', getMembershipPage);
indexRouter.post('/membership', grantMembership);

indexRouter.get('/admin', getAdminPage);
indexRouter.post('/admin', grantAdmin);

module.exports = indexRouter;
