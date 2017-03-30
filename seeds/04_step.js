
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('step').del()
    .then(function () {
      // Inserts seed entries
      return knex('step').insert([
        {step_number:1, step_body:'unwrap the beef', recipe_id:knex('recipe').where('name','beef stew').select('id')},
        {step_number:2, step_body:'beat the beef with a meat tenderizer',
        recipe_id:knex('recipe').where('name','beef stew').select('id')},
        {step_number:3, step_body:'be gentle with the carrots',
        recipe_id:knex('recipe').where('name','beef stew').select('id')},
        {step_number:4, step_body:'filler 1',
        recipe_id:knex('recipe').where('name','french fries').select('id')},
        {step_number:5, step_body:'filler 2',
        recipe_id:knex('recipe').where('name','french fries').select('id')},
        {step_number:6, step_body:'fillah 3',
        recipe_id:knex('recipe').where('name','french fries').select('id')},

      ]);
    });
};
