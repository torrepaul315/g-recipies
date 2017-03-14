
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
      ]);
    });
};
