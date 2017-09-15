const models = require('../../db/models');
const s3 = require('../middleware/s3').s3;
const moment = require('moment');

module.exports.update = (req, res) => {
  models.Posts.where({ id: req.params.post_id }).fetch()
    .then((post) => {
      if (!post) {
        throw post;
      }
      post.set(req.body.params.type, req.body.params[req.body.params.type]);
      return post.save();
    })
    .then(data => {
      res.send(201).send(data.name);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.delete = (req, res) => {
  models.Posts.query().where({ id: req.params.post_id }).del()
    .then((post) => {
      if (!post) {
        throw post;
      }
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};

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

  // var awsLink = `https://s3-${region}.amazonaws.com/localized-0001/${key}`;

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
        family_id: req.body.family_id,
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
            user_id: saved.attributes.user_id,
            type: saved.attributes.type,
          });
        })
        .catch((error) => {
          console.log('There was an error saving the file in the database:', error);
        });
    }
  });
};

module.exports.get = (req, res) => {
  models.Posts.query((qb) => {
    qb.where('family_id', '=', req.params.family_id).andWhereBetween('created_at', [req.query.fromDate, req.query.toDate]);
  })
    .fetchAll()
    .then((posts) => {
      res.send(posts);
    })
    .catch((error) => {
      console.log('[server] get posts by family and date error', error);
    });
};
