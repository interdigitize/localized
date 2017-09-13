'use strict';
const express = require('express');
const router = express.Router();
const Families = require('../controllers').Families;

router.route('/:family_id')
  .put(Families.update);

module.exports = router;
