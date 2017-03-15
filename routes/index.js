var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
/* GET home page. */
// router.get('/recipe', function(req, res, next) {
//   knex('recipe')
//   .join('review','recipe.id','=','review.recipe_id')
//   // .orderBy('rating')
//   .then(orderedRecipes => {
//     res.send(orderedRecipes)
//   }).catch(err => {
//     res.status(503).send(err.message)
//   })
// });
//will need to change naming convention, but yeah


//get all recipes, need to figure out the average of mechanism!
router.get('/recipe', (req,res, next) => {
  knex.select('id','name','image').from('recipe')
  .then(reviews => {
    res.send(reviews)
  }).catch(err => {
    res.status(503).send(err.message)
  })
});
//!!!



// as per isaac- !!!think about getting info, THEN doing more work on the result in the .then!
router.get('/recipeAvgReviewScore/:id', (req, res, next) => {

  knex('review').avg('rating').where('recipe_id',req.params.id)


  // this gives you back the rating field of the reviews
  // knex.select('rating').table('review')


  // knex('recipe')
  // .join('review','recipe.id','=','review.recipe_id')
  // .select('rating'


  .then(reviews => {
    res.send(reviews)
  }).catch(err => {
    res.status(503).send(err.message)
  })
});

/*
need to send back 1-
object with all of the recipes
2- an average rating for each recipe!
avg — .avg(column)
Retrieve the average of the values of a given column.

knex('users').avg('age')
Outputs:
select avg(`age`) from `users`
knex('users').avg('age as a')
Outputs:
select avg(`age`) as `a` from `users`

*/

router.get('/recipe/:id',(req,res,next) => {
  // console.log(req.params);
  // this part works!
   knex.select('id','name','image','description','author_id').from('recipe').where('id',req.params.id)

//need to- get the author name from the author table referencing the foreign key listed in the recipe table
  // knex.select('name').from('author').where('id','recipe.author_id')

  // references('author_id',req.params.id).inTable('recipe'))

// table.integer('author_id').references('id').inTable('author');


  .then(reviews => {
    var authorFk = reviews[0]['author_id'];
    knex.select('name').from('author').where('id', authorFk);
  })
    .then(everything => {
      // var author = knex('author').where('name', req.body.name);
      res.status(200).send(everything)


    }).catch(err => {
    res.status(503).send(err.message)
  })
});
  // knex.select('name').from('author').where('id', 'recipe.id')



router.post('/recipe', (req,res,next) =>{
  console.log(req.body);
   return knex('author').where('name', req.body.name).first()
  .then(name => {
    if (!name) {
      return knex('author')
        .insert({
          name: req.body.name
        })

    }
  })
  .then(() => {
    // console.log(req.body);
    return knex('recipe').insert({
      name:req.body.title,
      image:req.body.image,
      description:req.body.description,
      author_id: knex('author').where('name', req.body.name).select('id')
    })
  })
  .then(() => {
    return knex('step').insert({
      step_number:req.body.step_number,
      step_body:req.body.step_body,
      recipe_id: knex('recipe').where('name', req.body.title).first().select('id')
    })
  })
  .then(() => {
    return knex('ingredient').insert({
      name:req.body.ingredient
    })
  })



  .then(reviews => {
    // var author = knex('author').where('name', req.body.name);
    res.status(200).send(reviews)
  }).catch(err => {
    res.status(503).send(err.message)
  })
});

module.exports = router;
