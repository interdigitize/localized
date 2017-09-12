'use strict';
const express = require('express');
const router = express.Router();
const Posts = require('../controllers').Posts;

router.route('/')
  //.get(Posts);

module.exports = router;
