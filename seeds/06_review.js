
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('review').del()
    .then(function () {
      // Inserts seed entries
      return knex('review').insert([
        {body: 'this is without the best beef stew I"ve ever enjoyed! would use this recipe over and over',
        rating:5,
        recipe_id:knex('recipe').where('name','beef stew').select('id'),
        author_id:knex('author').where('name','Ignacio').select('id')},
        {body: 'the old bay seasoning is what really makes this recipe shine! thanks barefoot contessa!',
        rating:4,
        recipe_id:knex('recipe').where('name','beef stew').select('id'),
        author_id:knex('author').where('name','Ignacio').select('id')},
        {body: 'i"m not so sure about this recipe, maybe its the elevation, but it didn"t cook up very well',
        rating:3,
        recipe_id:knex('recipe').where('name','old swedish meatballs').select('id'),
        author_id:knex('author').where('name','Ignacio').select('id')},
        {body: 'seed to figure out average rating',
        rating:1,
        recipe_id:knex('recipe').where('name','old swedish meatballs').select('id'),
        author_id:knex('author').where('name','Juan Carlos').select('id')},
        {body: 'seed to figure out average rating',
        rating:1,
        recipe_id:knex('recipe').where('name','old swedish meatballs').select('id'),
        author_id:knex('author').where('name','JesuChristo').select('id')}
      ]);
    });
};
