'use strict';
const express = require('express');
const router = express.Router();
const s3upload = require('../controllers').s3upload;

router.route('/')
  .post(s3upload.save);

module.exports = router;
