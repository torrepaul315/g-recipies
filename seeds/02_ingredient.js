
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ingredient').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredient').insert([
        {name: 'carrots'},
        {name: 'onion'},
        {name: 'meat'},
        {name: 'potatos'},
        {name: 'celery'},
        {name: 'cabbage'},
        {name: 'chicken'},
      ]);
    });
};
