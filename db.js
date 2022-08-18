const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fast-track-db', { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err);
  return console.log('Connection successful');
});

const { Schema } = mongoose;

const moviesSchema = new Schema({

  title: {
    type: String,
    required: true,
    min: 2,
  },
  description: {
    type: String,
    required: true,
    min: 10,
  },
  dateReleased: {
    type: Date,
    required: true,
  },
  ratings: {
  type:Number,
  required: true,
  },
});

const Movie = mongoose.model('movie', moviesSchema);

module.exports = Movie;