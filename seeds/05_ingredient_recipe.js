
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ingredient_recipe').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredient_recipe').insert([
        {ingredient_id:knex('ingredient').where('name','carrots').select('id'),
        recipe_id:knex('recipe').where('name','beef stew').select('id'),
        quantity:'3'},
        {ingredient_id:knex('ingredient').where('name','onion').select('id'),
        recipe_id:knex('recipe').where('name','beef stew').select('id'),
        quantity:'2 cups chopped'},
        {ingredient_id:knex('ingredient').where('name','meat').select('id'),
        recipe_id:knex('recipe').where('name','beef stew').select('id'),
        quantity:'1 big chunk of meat'},

        {ingredient_id:knex('ingredient').where('name','celery').select('id'),
        recipe_id:knex('recipe').where('name','old swedish meatballs').select('id'),
        quantity:'1 big chunk of meat'},
        {ingredient_id:knex('ingredient').where('name','meat').select('id'),
        recipe_id:knex('recipe').where('name','old swedish meatballs').select('id'),
        quantity:'1 big chunk of meat'},
        {ingredient_id:knex('ingredient').where('name','cabbage').select('id'),
        recipe_id:knex('recipe').where('name','old swedish meatballs').select('id'),
        quantity:'1 big chunk of meat'},
        {ingredient_id:knex('ingredient').where('name','potatos').select('id'),
        recipe_id:knex('recipe').where('name','french fries').select('id'),
        quantity:'pick 5 big ones'},

      ]);
    });
};
