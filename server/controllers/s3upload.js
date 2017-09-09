const models = require('../../db/models');
const s3 = require('../middleware/s3.js').s3;

module.exports.save = (req, res) => {
  var filename = req.files[0].originalname.split('.')[0];
  var key = filename + '_' + Date.now().toString();
  var userId = req.user.id;
  var region = 'us-west-1';
  var bucket = 'localized-0001';
  var awsLink = `https://s3-${region}.amazonaws.com/localized-0001/${key}`;

  var params = {
    ACL: 'public-read',
    Bucket: bucket,
    Key: key,
    Body: req.files[0].buffer,
    ContentType: req.files[0].mimetype
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    console.log('S3 Response:', data);
    console.log('Uploaded By User:', userId);
    console.log(`Uploaded ${filename} to ${bucket}.`);
    res.end();
    //Save data somewhere here in order to save it with the e
  });
};
