'use strict';
const express = require('express');
const router = express.Router();
const Posts = require('../controllers').Posts;

router.route('/')
  .put(Posts.update);

module.exports = router;
