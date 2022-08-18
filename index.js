const express = require('express');
const app = express();
PORT = 1998;
const bodyParser = require('body-parser');
const router = require('./routes/movies');
const Movie = require('./db');

app.use(bodyParser.json());
console.log(Movie);
app.use(router);

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})