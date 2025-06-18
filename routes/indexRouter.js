const { Router } = require('express');
const {
  getIndexPage,
  getMembershipPage,
  grantMembership,
  grantAdmin,
  getAdminPage,
  getAboutPage,
} = require('../controllers/indexController');
const { isAuth } = require('../middleware/authMiddleware');

const indexRouter = Router();

indexRouter.get('/', getIndexPage);
indexRouter.get('/membership', isAuth, getMembershipPage);
indexRouter.post('/membership', isAuth, grantMembership);

indexRouter.get('/admin', isAuth, getAdminPage);
indexRouter.post('/admin', isAuth, grantAdmin);

indexRouter.get('/about', getAboutPage);
module.exports = indexRouter;
