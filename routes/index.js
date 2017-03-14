var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
/* GET home page. */
router.get('/recipe', function(req, res, next) {
  knex('recipe')
  .join('review','recipe.id','=','review.recipe_id')
  .orderBy('rating')
  .then(orderedRecipes => {
    res.send(orderedRecipes)
  }).catch(err => {
    res.status(503).send(err.message)
  })
});

router.get('/recipe', function(req, res, next) {
  knex('recipe')
  .join('review','recipe.id','=','review.recipe_id')
  .orderBy('rating')
  .then(orderedRecipes => {
    res.send(orderedRecipes)
  }).catch(err => {
    res.status(503).send(err.message)
  })
});

/*
need to send back 1-
object with all of the recipes
2- an average rating for each recipe!


module.exports = router;
