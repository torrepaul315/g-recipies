//need routes to - edit a recipe (description etc)and edit a review!


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


      // // this works, but a lot of nulls!
      // knex.select('*')
      // .from('recipe')
      // .leftJoin('review','recipe.id','review.recipe_id')
      // .whereNull('recipe_id')

      knex('recipe')
      .whereNotExists(knex.select('*').from('review').
      whereRaw('review.recipe_id = recipe.id'))

      // knex('users').whereNotExists(knex.select('*').from('accounts').whereRaw('users.account_id = accounts.id'))

      .then(reviews => {
        res.send(reviews)
      }).catch(err => {
        console.error(503);
        res.status(503).send(err.message)
      })
    }
})

/*  !!!!!!!individual recipe page!!!!!!!!!!   */


//!!!!!!!!!!!!!!!!!!!!!!!!!add route to add just an author or get all auths!

router.get('/author/:id',(req,res,next) => {
  knex('recipe')
  .join('author', 'recipe.author_id', '=','author.id')
  .select('author.name')
  .where('recipe.author_id',req.params.id)
  .then(author => {
    res.send(author)
  }).catch(err => {
    res.status(503).send(err.message)
  })

});



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
  knex('step').select('step_number','step_body','id').where('recipe_id',req.params.id)
  .then(steps => {
    res.status(200).send(steps)
  }).catch(err => {
    res.status(503).send(err.message)
  })
})

//!!! need to add in quantity!


//test this more....does this give us what we want/need? we won't need to select quantity anyways!

//got some work to do on this one!
router.get('/indivRecipeIngred/:id',
(req,res,next) => {
  knex('ingredient_recipe')
  .join('ingredient', 'ingredient_recipe.ingredient_id', '=','ingredient.id')
  .where('ingredient_recipe.recipe_id',req.params.id).select('name','quantity','ingredient_id')


  .then(steps => {
    res.status(200).send(steps)
  }).catch(err => {
    res.status(503).send(err.message)
  })
})

//not working!
router.get('/recipesAssociatedWithIngredient/:id', (req,res,next) => {
  knex('ingredient')
  .join('ingredient_recipe','ingredient.id','=','ingredient_recipe.ingredient_id')
  .where('ingedient_recipe.ingredient_id',req.params.id)
  .from('ingredient_recipe')
  // .select('ingredient_recipe.recipe_id')

  .then(steps => {
    res.status(200).send(steps)
  }).catch(err => {
    res.status(503).send(err.message)
  })
})












//this gets the review info by recipe ID
router.get('/review/:id', (req,res, next) => {
  knex('review')
  .select('body','rating','author_id','id')
  .where('recipe_id',req.params.id)
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
router.get('/indivSteps/:id', (req,res,next) => {
  knex('step')
  .select('step_body')
  .where('recipe_id',req.params.id)
  .then(authorId => {
    res.send(authorId)
  })
  .catch(err => {
    res.status(503).send(err.message)
  })
})


//get the individual ingredient, and all of the recipe ids+names associated with that !
router.get('/ingredAndAssRecipes/:id', (req,res,next) => {
  knex('')



})
// knex('ingredient')
// .join('ingredient_recipe','ingredient.id','=','ingredient_recipe.ingredient_id')
// .where('ingedient_recipe.ingredient_id',req.params.id)




///a join between ingredient.recipe and recipe! should be the inverse of the 'find all ingredients for this recipe query!'



router.get('/ingredient/id', (req,res,next) => {
  knex('ingredient').where('name', req.body.name).select
})
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

//!!!!!!!!!!!!!!need to check this route and make sure that it works!!!!!!!!!!!!!!!!!!!!
router.post('/review', (req,res,next) => {
  console.log(req.body);
  knex('author').where('name', req.body.name).select('*')
    .then(user => {
      console.log(user.length);
      if (user.length > 0) {
        console.log(user);
        console.log(user[0].id);
      return [user.id];
      }
      else {
        return knex('author')
          .returning('id')
          .insert({name: req.body.name,
          })
          console.log(name)
      }
    })
    .then((authorIds) =>
      authorIds[0]
    )
    .then(authorId => {
    knex('review')
    .returning('*')
    .insert({
      body:req.body.body,
      rating:req.body.rating,
      recipe_id:req.body.recipe_id,
      author_id:authorId,
    }).then(newReview => {
      // var author = knex('author').where('name', req.body.name);
      console.log(newReview);
      res.status(200).send(newReview)
    }).catch(err => {
      res.status(503).send(err.message)
    })
  })
})

///////////one last post route! create a review by default (so that with at least some rating data, the new recipe will show up if/when the person navigates back to the main page!)


//review this! it works when 'quantity' is there, breaks when it is not- is this the same issue I went over with isaac where the promise chain is not completed?
router.put('/recipeUpdate', (req,res,next) => {
  console.log()
})


router.put('/ingredientQuantityUpdate', (req,res,next) => {
  console.log(req.body);

    knex('ingredient_recipe').where('ingredient_id',
   parseInt(req.body.ingredient_id)).update({quantity:req.body.quantity,},'quantity')
   .then(quantity => {
     res.send(quantity);
   })
   .catch(err => {
     res.status(503).send(err.message)
   })
})

router.put('/ingredientUpdate', (req,res,next) => {
  console.log(req.body);
    knex('ingredient')
    .where('id',parseInt(req.body.ingredient_id))
    .update({
      name:req.body.name,
    },'name')
    .then(name => {
      res.send(name);
    })
    .catch(err => {
      res.status(503).send(err.message)
    })
})
//should I be referencing the step by it's unique id or step number? hmmmmm!
router.put('/stepUpdate', (req,res,next) => {
  knex('step')
  .where('id',parseInt(req.body.step_id))
  .update({
    step_number: req.body.step_number,
    step_body: req.body.step_body,
  }, 'step_body')
  .then((body) => {
    res.send(body);
  })
  .catch(err => {
    res.status(503).send(err.message)
  })

})
//update recipe
// router.put()

//update author

//edit/update review








//route to delete an individual step
  router.delete('/indivStep/:id', (req,res,next) => {
    knex('step').where('id',req.params.id).del()

  })

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







module.exports = router;
