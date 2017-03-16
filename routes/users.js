var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




router.post('/blog', (req, res) => {
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
      return knex('post').insert({author_id: authorId, title: req.body.title, body: req.body.body})
    })
    .then(() => {
      res.status(200).send()
    })
    .catch(err => {
      res.status(503).send(err.message)
    })
})












router.post('/recipe', (req,res,next) =>{
   //need to use the returning a.if the author doesn't exist and b. return the id (to be used as a foreign key) if it does!
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

    // need to use returning to pass the recipe_id down!
    // console.log(req.body);
    return knex('recipe').insert({
      name:req.body.title,
      image:req.body.image,
      description:req.body.description,
      author_id: knex('author').where('name', req.body.name).select('id')
    })
  })
  .then(() => {
    ///this part did not work- I gave it two steps, (two step numbers and two step bodies) it added one step number, but put the two step numbers into one step number text field
    var stepNumber = parseInt(req.body.step_number);
    console.log(stepNumber);
    //prolly need to keep passing the foreign key down!
    //major issue! try refactoring this to a for loop, looking at the stec
    return knex('step').insert({
      step_number:stepNumber,
      step_body:req.body.step_body,
      recipe_id: knex('recipe').where('name', req.body.title).first().select('id')
    })
  })
  .then(() => {
    return knex('ingredient').insert({
      name:req.body.ingredient,
    })
  })

  //.then- I need to go to ingredient_recipe!
  .then(result => {
    // var author = knex('author').where('name', req.body.name);
    res.status(200).send(result)
  }).catch(err => {
    res.status(503).send(err.message)
  })
});



   //need to use the returning a.if the author doesn't exist and b. return the id (to be used as a foreign key) if it does!
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

    // need to use returning to pass the recipe_id down!
    // console.log(req.body);
    return knex('recipe').insert({
      name:req.body.title,
      image:req.body.image,
      description:req.body.description,
      author_id: knex('author').where('name', req.body.name).select('id')
    })
  })
  .then(() => {
    var stepNumber = parseInt(req.body.step_number);
    console.log(stepNumber);
    //prolly need to keep passing the foreign key down!
    //major issue! try refactoring this to a for loop, looking at the stec
    return knex('step').insert({
      step_number:stepNumber,
      step_body:req.body.step_body,
      recipe_id: knex('recipe').where('name', req.body.title).first().select('id')
    })
  })
  .then(() => {
    return knex('ingredient').insert({
      name:req.body.ingredient,
    })
  })

  //.then- I need to go to ingredient_recipe!
  .then(result => {
    // var author = knex('author').where('name', req.body.name);
    res.status(200).send(result)
  }).catch(err => {
    res.status(503).send(err.message)
  })
});

router.post('/recipe', (req,res,next) =>{
   //need to use the returning a.if the author doesn't exist and b. return the id (to be used as a foreign key) if it does!
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
