'use strict';
const express = require('express');
const router = express.Router();
const MailerController = require('../controllers').Mailer;

router.route('/inviteByEmail')
  .get(MailerController.inviteByEmail);

router.route('/send')
  .get(MailerController.send);

router.route('/invite')
  .get(MailerController.invite);

module.exports = router;
