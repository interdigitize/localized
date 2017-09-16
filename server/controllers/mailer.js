const nodemailer = require('nodemailer');
const mailerConfig = require('config').get('mailer');
const { emailTemplate } = require('../views/email-template');

const { Invites } = require('../../db/models');
module.exports.invite = (req, res) => {
  var { toEmail, fromEmail, familyId } = req.query;
  // initiate response
  var jsonResponse = { success: false };
  // itterate over comma seperated emails
  var toEmails = toEmail.split(', ')
    .forEach((toEmail, index) => {
      // check if email : invited_by row exists in invites
      Invites.where({ email: toEmail, invited_by: fromEmail }).fetch()
      // don't add entry if email is ''
        .then((invite) => {
          // if invite exists in table
          if (invite) { throw invite; }

          // create invite entry
          Invites.forge({
            email: toEmail,
            invited_by: fromEmail,
            family_id: familyId
          }).save();

          // create entries json response
          jsonResponse[index] = {
            success: false,
            payload: {
              email: toEmail,
              message: `Its on its way to ${toEmail}.`
            }
          };
          return jsonResponse;
        })
        .then((jsonResponse) => {
          jsonResponse['success'] = true;
          res.json(jsonResponse);
        })
        .catch((invite) => {
          jsonResponse[index] = {
            success: false,
            payload: {
              email: toEmail,
              message: `${toEmail} has already been notified.`
            }
          };
        })
        .error((error) => {
          jsonResponse['error'] = error;
          res.json(jsonResponse);
        });
    });
};

module.exports.send = (req, res) => {
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

  Invites.fetchAll().then((invites) => {
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

      transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
          console.log(err);
          jsonResponse[id] = {
            sucess: false,
            payload: {
              error: err.Error
            }
          };
        } else {
          jsonResponse[id] = {
            sucess: true,
            payload: {
              accepted: res.accepted,
              envelope: res.envelope,
              messagedId: res.messageId
            }
          };

          console.log('Email Sent');
        }
      }); // sendMail
    }); // forEach
    res.json(jsonResponse);
  });
};

module.exports.inviteByEmail = (req, res) => {
  var { toEmail, fromEmail, fromFirst, fromLast, familyId } = req.query;

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

  var link = `http://localhost:3000/signup?invitedBy=${fromEmail}&familyid=${familyId}&email=${toEmail}`;
  var email = emailTemplate(link);

  console.log('sending to ', toEmail);
  var mailOptions = {
    from: `${fromFirst} <${fromEmail}>`,
    to: `${toEmail}`,
    subject: 'Join your family!',
    html: `${email}`
  };

  var inviteByEmailCB = (bool) => {
    res.json(bool);
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
      inviteByEmailCB(false);
    } else {
      console.log('Email Sent');
      inviteByEmailCB(true);
    }
  });
};
