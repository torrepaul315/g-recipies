
exports.up = function(knex, Promise) {
  return knex.schema.createTable('step', function(table){
  table.increments('id').primary();
  table.integer('step_number');
  table.text('step_body');
  table.integer('recipe_id').references('id').inTable('recipe');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('step');
};
