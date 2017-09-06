const db = require('../');

const Families = db.Model.extend({
  tableNmae: 'families',
});

module.exports = db.model('Families', Families);