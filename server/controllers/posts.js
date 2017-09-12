const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Posts.fetchAll()
    .then(posts => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.getAllByFamilyID = (req, res) => {
  models.Posts.fetchAll()
  //For now (Sept 12): fetching all profiles b/c we are not pulling in members by family ID yet. We need to add in criterion of retrieving members by family ID.
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Posts.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  models.Posts.where({ id: req.params.id }).fetch()
    .then(post => {
      if (!post) {
        throw post;
      }
      res.status(200).send(post);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Posts.where({ id: req.params.id }).fetch()
    .then(post => {
      if (!post) {
        throw post;
      }
      return post.save(req.body, { method: 'update' });
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

// module.exports.deleteOne = (req, res) => {
//   models.Posts.where({ id: req.params.id }).fetch()
//     .then(post => {
//       if (!post) {
//         throw post;
//       }
//       return post.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
