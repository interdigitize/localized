'use strict';
const express = require('express');
const router = express.Router();
const Posts = require('../controllers').Posts;

router.route('/:post_id')
  .put(Posts.update)
  .delete(Posts.delete);

router.route('/')
  .post(Posts.post);

router.route('/family/:family_id')
  .get(Posts.get);

module.exports = router;
