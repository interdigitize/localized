const db = require('../');

const Invites = db.Model.extend({
  tableName: 'invites'
});

module.exports = db.model('Invites', Invites);
