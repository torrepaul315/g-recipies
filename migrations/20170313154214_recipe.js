
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipe', function(table){
  table.increments('id').primary();
  table.string('name');
  table.integer('author_id').references('id').inTable('author');
  table.timestamp('recipe_timestamp').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipe');
};