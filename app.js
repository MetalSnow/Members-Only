const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');
const passport = require('./config/passport');
const session = require('express-session');
const authContext = require('./middleware/authContext');
const errorHandler = require('./middleware/errorHandler');
const msgRouter = require('./routes/msgRouter');
require('dotenv').config();

const app = express();

const assetspath = path.join(__dirname, '/public');

app.use(express.static(assetspath));

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 * 2,
      sameSite: 'lax',
    },
  })
);

app.use(passport.session());

app.use(authContext);

app.use(indexRouter);
app.use(authRouter);
app.use(msgRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
