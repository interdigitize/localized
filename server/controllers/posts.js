const models = require('../../db/models');

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
