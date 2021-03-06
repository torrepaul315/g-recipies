
exports.up = function(knex, Promise) {
  return knex.schema.createTable('review', function(table){
    table.increments();
    table.text('body');
    table.integer('rating');
    table.integer('recipe_id').references('id').inTable('recipe').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('author_id').references('id').inTable('author').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamp('review_timestamp').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('review');
};
