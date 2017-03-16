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


/* !!!!!home/index page! what we have might work, may need to do overhaul of the averaging one to provide an array object of all recipes and all review averages
*/
//gets all recipes (for first page)
// router.get('/recipe', (req,res, next) => {
//   knex.select('id','name','image').from('recipe')
//   .then(reviews => {
//     res.send(reviews)
//   }).catch(err => {
//     res.status(503).send(err.message)
//   })
// });
//generates average review for each recipe
router.get('/recipeAvgReviewScore/:id', (req, res, next) => {
  knex('review').avg('rating').where('recipe_id',req.params.id)
  .then(reviews => {
    reviews.push({'recipe_id':req.params.id});
    res.send(reviews)
  }).catch(err => {
    res.status(503).send(err.message)
  })
});

//f

router.get('/recipe', (req,res,next) => {
    if(req.query.avgReview) {
      knex('recipe')
      .join('review','recipe.id','=','review.recipe_id')
      .groupBy('recipe.id')
      .avg('review.rating').as('recipe.avg_rating')

      .select('recipe.*')
      // .orderBy('recipe.avg_rating')
      .then(reviews => {
        res.send(reviews)
      }).catch(err => {
        res.status(503).send(err.message)
      })
    }
    else {
      knex.select('id','name','image').from('recipe')
      .then(reviews => {
        res.send(reviews)
      }).catch(err => {
        res.status(503).send(err.message)
      })
    }
})

/*  !!!!!!!individual recipe page!!!!!!!!!!   */


//!!!!!!!!!!!!!!!!!!!!!!!!!add route to add just an author or get all auths!


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

router.get('/indivRecipeSteps/:id',      (req,res,next) => {
  knex('step').select('step_number','step_body').where('recipe_id',req.params.id)
  .then(steps => {
    res.status(200).send(steps)
  }).catch(err => {
    res.status(503).send(err.message)
  })
})

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













///? dont think this is functioning!
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






//use a for each?
  // this gives you back the rating field of the reviews
  // knex.select('rating').table('review')


  // knex('recipe')
  // .join('review','recipe.id','=','review.recipe_id')
  // .select('rating'



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

  // knex.select('name').from('author').where('id', 'recipe.id')


//route to get indiv recipe steps for the indiv recipe page


//route to get ingredients for indiv recipe



// .join('ingredient', 'ingredient_recipe.ingredient_id', '=','ingredient.id')
// .where('recipe.id',req.params.id).select('*')

router.post('/author', (req,res,next) =>{
  knex('author').where('name', req.body.name).first()
    .then(author => {
      if (author) {
        return [author.id];
      } else {
        return knex('author')
          .returning('id')
          .insert({name: req.body.name})
      }
    })
    .then((authorIds) => authorIds[0])
    .then(authorId => {
      res.json(authorId)
    })
    .catch(err => {
      res.status(503).send(err.message)
    })
})

router.post('/recipeAdd', (req,res,next) => {

  knex('recipe').insert({
    name:req.body.title,
    image:req.body.image,
    description:req.body.description,
    author_id:req.body.author_id,
  }).returning('id')

    .then(newRecipe => {
      console.log(newRecipe)
      res.status(200).json(newRecipe[0])
      // res.json(authorId)
    })
    .catch(err => {
      res.status(503).send(err.message)
    })
})

router.post('/stepAdd', (req,res,next) => {
  var stepNumber = parseInt(req.body.step_number);
  console.log(stepNumber);
  var recipeId = parseInt(req.body.id);
  console.log(recipeId);
    knex('step').insert({
      step_number:stepNumber,
      step_body:req.body.step_body,
      recipe_id:recipeId
    })
    .then((result) => {
      res.status(200).send(result)
    }).catch(err => {
      res.status(503).send(err.message)
    })
});
//args- quantity, fk ingred, fk recipe, name
router.post('/ingredientAdd', (req,res,next) => {
  console.log(req.body)
  knex('ingredient').insert({
    name: req.body.name,
  })
  .returning('id')
  .then((ingredId) => ingredId[0])
  .then((ingredId) => {
    console.log(ingredId);
    var recipeId = parseInt(req.body.id);
    console.log(recipeId);
    knex('ingredient_recipe').insert({
      ingredient_id:ingredId,
      recipe_id:recipeId,
      quantity:req.body.quantity,
    })
    .then(success => {
      return;
    })
    .catch(err => {
      console.log(err);
    })
  })
  .then((something) => {
    res.status(200).json(something)
  })
  .catch(err => {
    res.status(503).send(err.message)
  })

});


router.post('/review', (req,res,next) => {
  console.log(req.body);
  knex('author').where('name', req.body.name).select('name')
    .then(user => {
      console.log(user[0].name);
      if (!user) {
        return knex('author')
          .returning('id')
          .insert({name: req.body.name,
          })
      }
    })
    .then((authorIds) => {
      console.log(authorIds)
    })
    .then(authorId => {
    knex('review').insert({
      body:req.body.body,
      rating:req.body.rating,
      recipe_id:req.body.recipe_id,
      author_id:authorId,
    }).then(newReview => {
      // var author = knex('author').where('name', req.body.name);
      res.status(200).send(newReview)
    }).catch(err => {
      res.status(503).send(err.message)
    })
  })
})

/*
new recipe page- almost there!
1- problem- this is set up to just take one step and one ingredient ergo
a. should prolly split post into 2 separate requests, one for the one to ones and a second post to handle steps and ingredients

2- this post does not add anything to the ingredient_recipe join table!

3- this also does not take into account quanitity!

4- from isaac
modularize your routes! no big honker of a post request

do a 'post chain' ie
one, have separate routes to insert into each basic table
each route returns back to the front end
you generally only want to insert into one table at a time!

go to author- if exists great- send back author id.  if it doesn't exist, insert new author, send back id

.returning
so! work on using the author post route, using returning, and then sending back


*/

//also, is there a script line I should be running to see what I am deleting?
router.delete('/recipe/:id',
(req,res,next) => {
  var recipeId = parseInt(req.params.id);


  knex('recipe').where('id',recipeId).del()

  .then((result) => {
    console.log(result);
    res.status(204).send()
  })
  .catch(err => {
    res.status(503).send(err.message)
  })
})

//this should be all i need for this route I believe!
router.delete('/review/:id',
(req,res,next) => {
  knex('review').where('id',
  parseInt(req.params.id)).del()
  .then(() => {
    res.status(204).send()
  })
  .catch(err => {
    res.status(503).send(err.message)
  })
})

// router.delete('/step/:id',
// (req,res,next) => {
//   knex('step').where('id',
//   parseInt(req.params.id)).del()
//   .then(())
//
//
//
// })





module.exports = router;
