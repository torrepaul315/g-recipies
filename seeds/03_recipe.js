
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipe').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe').insert([
        {name: 'beef stew',author_id: knex('author').where('name','Juan Carlos').select('id'),
        image:'http://www.onceuponachef.com/images/2011/02/6a0115721bb963970b0147e234ca30970b-450wi.jpg',
        description:'the best beef stew ever'},
        {name: 'old swedish meatballs',author_id: knex('author').where('name','Ignacio').select('id'),
        image:'http://www.onceuponachef.com/images/2014/12/Swedish-Meatballs6-575x410.jpg',
        description:'just go to IKEA and pick up a bunch of meatballs there'},
        {name: 'french fries',author_id: knex('author').where('name','JesuChristo').select('id'),
        image:'http://s.eatthis-cdn.com/media/images/ext/384928298/mcdonalds-french-fries.jpg',
        description:'we used to call em freedom fries but we werent great when we did'},
      ]);
    });
};
