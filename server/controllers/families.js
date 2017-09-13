const models = require('../../db/models');

module.exports.update = (req, res) => {
  models.Familie.where({ id: req.params.family_id }).fetch()
    .then(family => {
      if (!family) {
        throw family;
      }
      family.set({name: req.body.params.name});

      return family.save();
    })
    .then((data) => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
