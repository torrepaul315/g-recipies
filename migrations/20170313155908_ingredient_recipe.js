
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ingredient_recipe', function(table){
    table.integer('ingredient_id').references('id').inTable('ingredient').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('recipe_id').references('id').inTable('recipe').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('quantity');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ingredient_recipe');
};
