'use strict';
const express = require('express');
const router = express.Router();
const MailerController = require('../controllers').Mailer;

router.route('/sendEmails')
  .get(MailerController.sendEmails);

router.route('/invite')
  .get(MailerController.invite);

module.exports = router;
