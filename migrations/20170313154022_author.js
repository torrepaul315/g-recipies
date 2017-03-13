
exports.up = function(knex, Promise) {
  return knex.schema.createTable('author', function(table){
  table.increments();
  table.string('name');
  table.timestamp('author_timestamp').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('author');
};
