var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  title: String,
  information: String,
  favoriteCount: Number
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports.movieModel = Movie;