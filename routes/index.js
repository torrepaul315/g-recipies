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


//get all recipes (for first page)
router.get('/recipe', (req,res, next) => {
  knex.select('id','name','image').from('recipe')
  .then(reviews => {
    res.send(reviews)
  }).catch(err => {
    res.status(503).send(err.message)
  })
});
//!!!


router.get('/review', (req,res, next) => {
  // knex.select('recipe_id', 'rating').from('review').
  knex.select('recipe_id').from('review').groupBy('review.id')
  // .avg('review.review')

  .then(review => {



      // knex().avg('rating').where('recipe_id',req.params.id)



    res.send(review)
  }).catch(err => {
    res.status(503).send(err.message)
  })
});


// as per isaac- !!!think about getting info, THEN doing more work on the result in the .then!
router.get('/averagereview', (req,res, next) => {
  knex('review').select('rating','recipe_id').orderBy('recipe_id')
})


router.get('/recipeAvgReviewScore/:id', (req, res, next) => {

  knex('review').avg('rating').where('recipe_id',req.params.id)



//use a for each?
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
//this route gets the info from the recipe and author table for the individual recipe page
router.get('/recipeAndAuthor/:id',(req,res,next) => {

    return knex('recipe')
    .join('author', 'recipe.author_id', '=','author.id')
    .where('recipe.id',req.params.id).select('*')
    //  .select('recipe.id','recipe.name','recipe.image','recipe.description','author.name').where('id',req.params.id)

    .then(result => {
      res.status(200).send(result)


//need to- get the author name from the author table referencing the foreign key listed in the recipe table
  // knex.select('name').from('author').where('id','recipe.author_id')

  // references('author_id',req.params.id).inTable('recipe'))

// table.integer('author_id').references('id').inTable('author');


  // .then(reviews => {
  //   var authorFk = reviews[0]['author_id'];
  //   console.log(authorFk);
  //   return knex.select('name').from('author').where('id', authorFk);
  //   console.log(author);
  // })
  //   .then(everything => {
  //     // var author = knex('author').where('name', req.body.name);
  //     console.log(everything);
  //     res.status(200).send( everything)


    }).catch(err => {
    res.status(503).send(err.message)
  })
});
  // knex.select('name').from('author').where('id', 'recipe.id')


//route to get indiv recipe steps for the indiv recipe page
router.get('/indivRecipeSteps/:id',      (req,res,next) => {
  knex('step').select('step_number','step_body').where('recipe_id',req.params.id)
  .then(steps => {
    res.status(200).send(steps)
  }).catch(err => {
    res.status(503).send(err.message)
  })
})

//route to get ingredients for indiv recipe

//!!! need to add in quantity!
router.get('/indivRecipeIngred/:id',
(req,res,next) => {
  knex('ingredient_recipe')
  .join('ingredient', 'ingredient_recipe.ingredient_id', '=','ingredient.id')
  .where('ingredient_recipe.recipe_id',req.params.id).select('name','quantity')

  //
  // .select('ingredient_id').where('recipe_id',req.params.id)
  .then(steps => {
    res.status(200).send(steps)
  }).catch(err => {
    res.status(503).send(err.message)
  })
})

// .join('ingredient', 'ingredient_recipe.ingredient_id', '=','ingredient.id')
// .where('recipe.id',req.params.id).select('*')









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
