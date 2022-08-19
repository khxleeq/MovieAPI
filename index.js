const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movies');
const Movie = require('./db');

app.use(bodyParser.json());
console.log(Movie);
app.use(movieRoutes);

const server = app.listen(1998, () => {
    console.log(`Server started on port ${server.address().port}`);
  });
  
  module.exports = server;