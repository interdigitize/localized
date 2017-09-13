'use strict';
const express = require('express');
const router = express.Router();
const Posts = require('../controllers').Posts;

router.route('/:post_id')
  .put(Posts.update);

module.exports = router;
