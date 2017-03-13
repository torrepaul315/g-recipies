
exports.up = function(knex, Promise) {
  return knex.schema.createTable('author', function(table){
  table.string('name');
  table.string('email').primary();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
