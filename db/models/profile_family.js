const db = require('../');
const Profiles = require('./');
const Families = require('./');

const Profile_Families = db.Model.extend({
  tableName: 'profile_families',
  families_id: function() {
    return this.hasmany(Profiles);
  },
  profiles_id: function() {
    return this.hasMany(Profiles);
  }
});

module.exports = db.model('Profile_Families', Profile_Families);