const db = require('../');
const Profiles = require('./');
const Auth = require('./');

const Profile_Auth = db.Model.extend({
  tableName: 'profile_auth',
  
});

module.exports = db.model('Profile_Auth', Profile_Auth);