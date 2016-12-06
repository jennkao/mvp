var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  title: String,
  poster: String,
  year: String,
  director: String,
  actors: String,
  plot: String,
  imdbID: String,
  favoriteCount: Number
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports.movieModel = Movie;