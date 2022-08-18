const router = require('express').Router();

const Movie = require('../db');

router.get('/hello', (req, res, next) => {
  res.send("Hello, World!")
});

router.post('/createMovie', (req, res, next) => {
  console.log('BODY:', req.body);
  if (!req.body || Object.keys(req.body).length < 1) return next({ status: 400, message: 'No body' });

  Movie.create(req.body).then((result) => res.status(201).json(result)).catch((err) => next(err));
});

router.get('/getAllMovies', (req, res, next) => {
    Movie.find().then((results) => res.json(results)).catch((err) => next(err));
  });
  
  router.get('/getMovie/:id', (req, res, next) => {
    console.log('PARAMS', req.params);
    const { id } = req.params;
    if (id === null || id === undefined) return next({ status: 400, message: 'Missing id' });
  
    Movie.findById(id).then((result) => res.json(result)).catch((err) => next(err));
  });
  
  router.patch('/updateMovie/:id', (req, res, next) => {
    console.log('PARAMS', req.params);
    console.log('QUERY:', req.query);
    const { id } = req.params;
  
    Movie.findByIdAndUpdate(id, req.query).then((result) => res.json(result)).catch((e) => next(e));
  });
  
  router.delete('/removeMovie/:id', async (req, res, next) => {
    console.log('PARAMS:', req.params);
  
    try {
      const result = await Movie.findByIdAndDelete(req.params.id);
      return res.status(204).send(result);
    } catch (err) {
      return next(err);
    }
  });
  
  module.exports = router;