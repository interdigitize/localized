const models = require('../models');
const users = require('../dummydata2.js').dummydataTwo['profiles'];

exports.seed = function (knex, Promise) {
  var userPromises = [];
  users.forEach((user) => {
    userPromises.push(createUser(knex, user));
  });

  return Promise.all(userPromises);
};

const createUser = (knex, user) => {
  return knex.table('profiles')
    .returning('id')
    .insert(
      {
        first: user.first,
        last: user.last,
        display: user.display,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar
      }
    )
    .then((userIds) => {
      return knex('auths')
        .insert(
          {
            type: 'local',
            password: 'hello',
            salt: 'hello',
            profile_id: userIds[0]
          }
        );
    });
};
