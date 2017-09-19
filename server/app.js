'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const db = require('../db');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: true}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

var upload = middleware.multer();
app.use(upload.any());

app.use('/', routes.auth);
app.use('/api/profiles', routes.profiles);
app.use('/api/posts', routes.posts);
app.use('/api/families', routes.families);
app.use('/api/mailer', routes.mailer);
app.use('/api/comments', routes.comments);
app.use('/api', routes.api);

app.get('*', (req, res) => {
  const preloadedState = {};
  preloadedState.user = req.user;
  // grab other relevant user data
  res.render(path.resolve(__dirname, 'views', 'index.ejs'), { preloadedState });
});


module.exports = app;
