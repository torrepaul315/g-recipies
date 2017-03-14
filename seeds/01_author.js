
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('author').del()
    .then(function () {
      // Inserts seed entries
      return knex('author').insert([
        {name: 'Juan Carlos'},
        {name: 'Ignacio'},
        {name: 'JesuChristo'}
      ]);
    });
};
