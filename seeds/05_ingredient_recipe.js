
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ingredient_recipe').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredient_recipe').insert([
        {ingredient_id:knex('ingredients').where('name','carrots').select('id'),
        recipe_id:knex('recipe').where('name','beef stew').select('id')},
        {ingredient_id:knex('ingredients').where('name','onion').select('id'),
        recipe_id:knex('recipe').where('name','beef stew').select('id')},
        {ingredient_id:knex('ingredients').where('name','meat').select('id'),
        recipe_id:knex('recipe').where('name','beef stew').select('id')},



      ]);
    });
};
