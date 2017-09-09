const db = require('../');
const Families = require('./');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  families: function() {
    return this.belongsToMany(Families, 'profiles_families');
  }
});

module.exports = db.model('Profile', Profile);
