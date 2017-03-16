
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipe', function(table){
  table.increments('id').primary();
  table.string('name');
  table.text('image');
  table.text('description');
  table.integer('author_id').references('id').inTable('author').onDelete('CASCADE').onUpdate('CASCADE');
  table.timestamp('recipe_timestamp').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipe');
};
