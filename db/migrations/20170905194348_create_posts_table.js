
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('posts', (table) => {
    table.increments('id').unsigned().primary();
    table.string('url');
    table.integer('user_id');
    table.integer('family_id');
    table.string('type', 20).nullable();
    table.string('title');
    table.string('description');
    table.string('etag');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};
  
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
  
