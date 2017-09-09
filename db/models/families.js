const db = require('../');
const Profiles = require('./');

const Families = db.Model.extend({
  tableName: 'families',
  profile_families: function() {
    return this.belongsToMany(Profiles, 'profiles_families')
  }
});

module.exports = db.model('Families', Families);
