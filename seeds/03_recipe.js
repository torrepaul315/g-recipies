
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipe').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe').insert([
        {name: 'beef stew',author_id: knex('author').where('name','Juan Carlos').select('id')},
        {name: 'old swedish meatballs',author_id: knex('author').where('name','Ignacio').select('id')},
        {name: 'french fries',author_id: knex('author').where('name','JesuChristo').select('id')},
      ]);
    });
};
