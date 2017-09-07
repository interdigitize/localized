const db = require('../');

const Families = db.Model.extend({
  tableName: 'families',
});

module.exports = db.model('Families', Families);
