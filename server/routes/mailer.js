'use strict';
const express = require('express');
const router = express.Router();
const MailerController = require('../controllers').Mailer;

router.route('/inviteByEmail')
  .get(MailerController.inviteByEmail);

module.exports = router;
