
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('posts', (table) => {
      table.increments('id').unsigned().primary();
      table.string('url');
      table.integer('user_id');
      table.integer('family_id');
      table.string('type', 20).nullable();
      table.string('title');
      table.string('description');
      table.string('etag');
      table.string('thumbnail');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTableIfNotExists('families_profiles', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('family_id').references('families.id').onDelete('CASCADE');
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('families', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name').defaultTo('My Family');
    }),
    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.string('avatar', 300).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('invites', function(table) {
      table.increments('id').unsigned().primary();
      table.string('email', 100).notNullable();
      table.string('invited_by', 100).notNullable();
      table.integer('family_id').notNullable();
    }),
    knex.schema.createTableIfNotExists('comments', function(table) {
      table.increments('id').unsigned().primary();
      table.string('content', 500).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('posted_by').notNullable();
      table.integer('post_id').references('posts.id').onDelete('CASCADE');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('invites'),
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('families_profiles'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('families'),
    knex.schema.dropTable('posts'),
  ]);
};
