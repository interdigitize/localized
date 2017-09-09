module.exports.emailTemplate = function(link) {
  return (`<body bgcolor="#f6f6f6" style="font-family: Arial; background-color: #f6f6f6;">
  <table width="630" class="container" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td>
      <table align="left">
        <tr>
          <td width="188" class="Logo">
            <img src="http://www.rickygipson.com/images/codepen/company_logo.png">
          </td>
        </tr>
      </table>
      <table align="right">
        <tr>
          <td height="70" class="viewWebsite">
            <p style="font-family: Arial, Helvetica, sans-serif; color: #555555; font-size: 10px; padding: 0; margin: 0;">If you are having trouble viewing this email, please <a href="#" style="color: #990000;">click here</a>.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  </table>

  <table width="630" bgcolor="#fcfcfc" style="border: 1px solid #dddddd; line-height: 135%;" class="container" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td bgcolor="#fcfcfc" colspan="3" width="100%" height="10">&nbsp;</td>
  </tr>
  <tr>
    <td bgcolor="#fcfcfc" colspan="3" align="center">
      <img src="http://www.rickygipson.com/images/codepen/main-image.jpg" width="100%">
    </td>
  </tr>
  <tr>
    <td colspan="3" height="15">&nbsp;</td>
  </tr>
  <tr>
    <td bgcolor="#fcfcfc" colspan="3">
      <table>
        <tr>
          <td width="30" class="spacer">&nbsp;</td>
          <td align="center" class="bodyCopy">
            <h1 style="font-family: Arial, Helvetica, sans-serif; font-size: 32px; color: #404040; margin-top: 0; margin-bottom: 20px; padding: 0; line-height: 135%" class="headline">You've been invited to your family!</h1>
            <p style="font-family: Arial, Helvetica, sans-serif; color: #555555; font-size: 14px; padding: 0 40px;">Confused? Don't be! You've been chosen to join your family at Localized.
              An exclusive opportunity that only the most interesting people get offered. Click the link below and create your account at Localized. Fill out the remaining information and get access to the family you've always dreamt of.</p>
            <a href="${link}">Click this link to join your Family</a>
          </td>
          <td width="30" class="spacer">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td colspan="3" align="center">
      <img src="http://www.rickygipson.com/images/codepen/grey_div.jpg" width="95%">
    </td>
  </tr>
  <tr>
    <td colspan="3" height="3">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="3" class="force-width">
      <table width="213" align="left" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="belowConsoles">
        <tr>
          <td width="35" class="spacer"></td>
          <td>
            <div class="consoleImage">
            <img src="http://www.rickygipson.com/images/codepen//thumbnails.jpg" class="belowFeatureIMG">
              </div>
            <h3 style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #404040; margin: 0; padding: 0;">What is Localized?</h3>
            <p style="font-family: Arial, Helvetica, sans-serif; color: #555555; font-size: 13px;">Localized is a revolutionary way to keep in touch with your beloved family members.</p>
          </td>
        </tr>
      </table>
      <table width="193" align="left" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="belowConsoles">
        <tr>
          <td width="15" class="spacer"></td>
          <td>
            <div class="consoleImage">
            <img src="http://www.rickygipson.com/images/codepen/thumbnails.jpg" class="belowFeatureIMG">
              </div>
            <h3 style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #404040; margin: 0; padding: 0;">What if I don't want a family?</h3>
            <p style="font-family: Arial, Helvetica, sans-serif; color: #555555; font-size: 13px;">A great man once said: "Mama always said life was like a box of chocolates; you never know what you're gonna get."</p>
          </td>
        </tr>
      </table>
      <table width="193" align="left" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="belowConsoles">
        <tr>
          <td width="15" class="spacer"></td>
          <td>
            <div class="consoleImage">
            <img src="http://www.rickygipson.com/images/codepen/thumbnails.jpg" class="belowFeatureIMG">
              </div>
            <h3 style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #404040; margin: 0; padding: 0;">What we do with your data</h3>
            <p style="font-family: Arial, Helvetica, sans-serif; color: #555555; font-size: 13px;">Your cherished memories are safely stored.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  </table>
</body>
`);
}
