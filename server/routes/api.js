'use strict';
const express = require('express');
const router = express.Router();
const Posts = require('../../db/models/posts');

router.route('/')
  .get((req, res) => {
    Posts
      .fetchAll()
      .then((contacts) => {
        res.json({contacts});
      })
      .catch((error) => {
        console.log(error);
      });
    // res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    new Posts({
      url: req.body.url,
      user_id: req.body.user_id,
      family_id: req.body.family_id,
      type: req.body.type, 
      title: req.body.title,
      description: req.body.description,
      etag: req.body.etag//response from AWS
    })
      .save()
      .then((saved) => {
        res.json({saved});
      })
      .catch((error) => {
        console.log(error);
      });
    // res.status(201).send({ data: 'Posted!' });
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
