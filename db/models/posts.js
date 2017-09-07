const db = require('../');
const Profiles = require('./profiles');

const Posts = db.Model.extend({
  tableName: 'posts',
  // profile: function() {
  //   return this.belongsTo(Profiles);
  // }
});

module.exports = db.model('Posts', Posts);