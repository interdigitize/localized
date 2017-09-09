const db = require('../');
const Familie = require('./');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  families: function() {
    return this.belongsToMany('Familie', 'profiles_families');
  }
});

module.exports = db.model('Profile', Profile);
