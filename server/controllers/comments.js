const { Comments } = require('../../db/models');

module.exports.getComments = (req, res) => {
  const { id } = req.params;
  Comments.where({ post_id: id }).fetchAll()
    .then((comments) => {
      res.json(comments);
    })
    .catch((error) => {
      res.json(false);
    });
};

module.exports.postComment = (req, res) => {
  const { content, posted_by, post_id } = req.body;
  new Comments({
    content,
    posted_by,
    post_id
  })
    .save()
    .then((comment) => {
      res.json({
        success: true,
        payload: {
          comment
        }
      });
    })
    .catch((error) => {
      console.log('There was an error saving the comment in the database:', error);
    });
};
