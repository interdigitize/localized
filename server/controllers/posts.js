const models = require('../../db/models');

module.exports.update = (req, res) => {
  models.Posts.where({ id: req.params.post_id }).fetch()
    .then(post => {
      if (!post) {
        throw post;
      }
      post.set(req.body.params.type, req.body.params[req.body.params.type]);
      return post.save();
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};