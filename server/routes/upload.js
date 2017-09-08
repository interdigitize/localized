'use strict';
const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

router.route('/')
  .post((req, res) => {
    console.log('BODY:', req.body);
    res.status(201).send({ data: 'Uploaded!' });
  });

module.exports = router;
