const nodemailer = require('nodemailer');
const mailerConfig = require('config').get('mailer');
const { emailTemplate } = require('../views/email-template');
const promise = require('bluebird');
const { Invites } = require('../../db/models');


/**
 * Given toEmail and fromEmail, determine whether they should be added to invite table
 * @param {string} toEmail - The invitee
 * @param {string} fromEmail - The inviteer
 * @param {number} fromEmail - The family id of invite request
 * @return {promise} A promise, that when resolves into a json response, indicating a success and success type
 */
const emailStatus = (toEmail, fromEmail, familyId) => {
  return new Promise((resolve, reject) => {
    var json = {};
    Invites.where({ email: toEmail, invited_by: fromEmail }).fetch()
      .then(invite => {
        if (invite) { throw invite; }

        Invites.forge({
          email: toEmail,
          invited_by: fromEmail,
          family_id: familyId
        }).save();

        json = {
          success: true,
          payload: {
            email: toEmail,
            message: `Its on its way to ${toEmail}.`
          }
        };
      })
      .catch(invite => {
        json = {
          success: false,
          payload: {
            email: toEmail,
            message: `${toEmail} has already been notified.`
          }
        };
      })
      .then(() => {
        resolve(json);
      })
      .error(error => {
        return error;
      });
  });
};


/**
 * Given toEmail and fromEmail, determine whether they should be added to invite table
 * @param {Object} req
 * @param {Object} res
 * @return {promise} JSON response, success {bool}, and payload {Object}
 */
module.exports.invite = (req, res) => {
  var { toEmail, fromEmail, familyId } = req.query;
  var emailResponses = toEmail.split(', ').map(email => {
    return emailStatus(email, fromEmail, familyId);
  });

  Promise.all(emailResponses)
    .then((results) => {
      var json = {};
      var success = results.reduce((all, item, index) => {
        return all && item.success;
      }, true);

      json = {
        success,
        payload: results
      };

      res.json(json);
    });

};

module.exports.sendEmails = (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: mailerConfig.user,
      clientId: mailerConfig.clientId,
      clientSecret: mailerConfig.clientSecret,
      refreshToken: mailerConfig.refreshToken,
      accessToken: mailerConfig.accessToken
    }
  });

  var { toEmails } = req.query;

  Invites.where('email', 'in', toEmails).fetchAll().then((invites) => {
    invites.forEach((invite) => {
      var { id, email, invited_by, family_id } = invite.attributes;
      var link = `http://localhost:3000/signup?invitedBy=${invited_by}&familyid=${family_id}&email=${email}`;
      var template = emailTemplate(link);
      var jsonResponse = { success: false };

      console.log('sending to ', email);

      var mailOptions = {
        from: `${invited_by}`,
        to: `${email}`,
        subject: 'Join your family!',
        html: `${template}`
      };

      var inviteByEmailCB = (bool) => {
        res.json(bool);
      };

      transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
          console.log(err);
          inviteByEmailCB(false);
        } else {
          inviteByEmailCB(true);
        }
      });
    });
  });
};
