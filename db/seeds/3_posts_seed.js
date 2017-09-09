const posts = require('../dummydata2.js').dummydataTwo['posts'];

exports.seed = function (knex, Promise) {
  var postPromises = [];
  posts.forEach((post) => {
    postPromises.push(createPosts(knex, post));
  });

  return Promise.all(postPromises);
};

const createPosts = (knex, post) => {
  return knex.table('posts')
    .insert(
      {
        url: post.url,
        title: post.title,
        description: post.description,
        type: post.type,
        user_id: post.user_id,
        family_id: post.family_id
      }
    );
};
