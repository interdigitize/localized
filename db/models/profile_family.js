const db = require('../');
const Profile = require('./');
const Families = require('./');

const Profile_Families = db.Model.extend({
  tableName: 'profiles_families',
  families_id: function() {
    return this.hasMany(Families);
  },
  profiles_id: function() {
    return this.hasMany(Profile);
  }
});

module.exports = db.model('Profile_Families', Profile_Families);
