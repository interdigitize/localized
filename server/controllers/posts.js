'use strict';

const models = require('../../db/models');
const s3 = require('../middleware/s3').s3;
const s3Stream = require('s3-upload-stream')(s3);
const ffmpeg = require('fluent-ffmpeg');
const {exec} = require('child_process');
const fs = require('fs');
const moment = require('moment');

const region = 'us-west-1';
const bucket = 'localized-0001';

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
    .error(error => {
      res.status(500).send(error);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};



module.exports.delete = (req, res) => {
  let fileName = req.query.url.split('com/').pop();
  models.Posts.query().where({ id: req.params.post_id }).del()
    .then((post) => {
      if (!post) {
        throw post;
      }
    })
    .then(() => {
      let params = {
        Bucket: bucket,
        Key: fileName,
      };

      s3.deleteObject(params, (error, data) => {
        if (data) {
          console.log('File deleted successfully :', data);
        } else {
          console.log('Check if you have sufficient permissions :', error);
        }
      });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(404);
    });
};

module.exports.save = (req, res) => {
  //FILE
  var filename = req.files[0].originalname;
=======
var save = (req, res, data = null, thumbnailUrl = null) => {
  new models.Posts({
    url: data.Location,
    user_id: req.user.id,
    family_id: req.body.family_id,
    type: req.files[0].mimetype,
    title: 'Add a title',
    description: 'Add a description',
    etag: data.ETag,
    thumbnail: thumbnailUrl
  })
    .save()
    .then((saved) => {
      res.json({
        url: saved.attributes.url,
        thumbnail: saved.attributes.thumbnail,
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
};

module.exports.post = (req, res) => {
>>>>>>> Adds video image capture and pulls out saving to the db so it is its own function.
  var mimetype = req.files[0].mimetype;
  var filename = req.files[0].originalname;
  var key = Date.now().toString() + '_' + filename;
  var videoCapture = key.split('.')[0] + '.jpg';
  var params = {
    ACL: 'public-read',
    Bucket: bucket,
    Key: key,
    Body: req.files[0].buffer,
    ContentType: req.files[0].mimetype
  };
  var s3res;

  s3.upload(params, (error, data) => {
    if (error) {
      console.log('s3upload error:', error);
      res.end();
    } else {
      console.log(`uploaded ${filename}`);
      if (mimetype !== 'video/mp4' ) {
        save(req, res, data);
      }
      s3res = data;
      if (!fs.existsSync('./videoCapture/')) {
        fs.mkdirSync('./videoCapture/');
      }
      exec(`ffmpeg -i ${data.Location} -ss 00:02 -r 1 -an -vframes 1 -f mjpeg ./videoCapture/${videoCapture}`, function(error, data) {
        if (error) {
          console.log('video image capture error', error);
        } else {
          var read = fs.createReadStream(`./videoCapture/${videoCapture}`);
          var upload = s3Stream.upload({
            'ACL': 'public-read',
            Bucket: bucket,
            Key: videoCapture,
            ContentType: 'image/jpg'
          });
          upload.maxPartSize(20971520); // 20 MB
          upload.concurrentParts(5);
          upload.on('error', function (error) {
            console.log(error);
          });
          upload.on('part', function (details) {
            // console.log(details); //uncomment to print details about each part
          });
          upload.on('uploaded', function (details) {
            save(req, res, s3res, details.Location);
          });
          read.pipe(upload);
        }
        fs.unlink(`./videoCapture/${videoCapture}`, (error, data) => {
          if (error) { console.log('Error removing the ', error); }
        });
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
