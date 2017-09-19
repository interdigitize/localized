const db = require('../');
const Posts = require('./');

const Comments = db.Model.extend({
  tableName: 'comments',
  post: function() {
    return this.belongsTo('Post');
  }
});

module.exports = db.model('Comments', Comments);
