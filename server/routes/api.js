'use strict';
const express = require('express');
const router = express.Router();
const Posts = require('../../db/models/posts');

router.route('/postsByFamily')
  .get((req, res) => {
    Posts
      .where('family_id', req.query.family_id)
      .fetchAll()
      .then((contacts) => {
        res.json({contacts});
      })
      .catch((error) => {
        console.log('[server] get posts error', error);
      });
  });

router.route('/:id')
  .put((req, res) => {
    Posts
      .where('id', req.params.id)
      .fetch()
      .then((contact) => {
        contact.save({
          title: req.body.title,
          description: req.body.description,
        })
          .then((saved) => {
            res.json({saved});
          });
      });
  })
  .delete((req, res) => {
    Posts
      .where('id', req.params.id)
      .destroy()
      .then((destroyed) => {
        res.json({destroyed});
      });
  });


module.exports = router;
