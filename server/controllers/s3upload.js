const models = require('../../db/models');
const s3 = require('../middleware/s3.js').s3;

module.exports.save = (req, res) => {
  //FILE
  var filename = req.files[0].originalname;
  var mimetype = req.files[0].mimetype;
  var title = 'Add a title';
  var description = 'Add a description';
  //AWS
  var region = 'us-west-1';
  var bucket = 'localized-0001';
  var key = Date.now().toString() + '_' + filename;

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
      console.log('s3upload controller error:', err);
      res.end();
    } else {
      console.log(`Uploaded ${filename} to ${bucket}.`);
      new models.Posts({
        url: data.Location,
        user_id: req.user.id,
        family_id: 1,
        type: mimetype,
        title: title,
        description: description,
        etag: data.ETag,
      })
        .save()
        .then((saved) => {
          res.json({
            url: saved.attributes.url,
            title: saved.attributes.title,
            description: saved.attributes.description,
            id: saved.id,
            user_id: saved.attributes.user_id
          });
        })
        .catch((error) => {
          console.log('There was an error saving the file in the database:', error);
        });
    }
  });
};
