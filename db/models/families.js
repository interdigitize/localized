const db = require('../');
const Profile = require('./');

const Familie = db.Model.extend({
  tableName: 'families',
  profile: function() {
    return this.belongsToMany('Profile', 'profiles_families');
  }
});

module.exports = db.model('Familie', Familie);
