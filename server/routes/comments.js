'use strict';
const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers').Comments;

router.route('/')
  .get((req, res) => {
    res.json('hey');
  });

router.route('/:id')
  .get(CommentsController.getComments)
  .post(CommentsController.postComment);


module.exports = router;
