var request = require('request');
var utils = require('./utils.js');
var mongoose = require('mongoose');
var querystring = require('querystring');
var movieModule = require('./db/movie.js');
var database = require('./db/db.js');
var env = require('./config/env.js');

var Movie = movieModule.movieModel;
var db = database.db;

var movieActions = {
  'POST': function(req, res) {
    var query = req.body.query;
    var escapedQ = querystring.escape(query);
    var theMovieDbApiKey = env.theMovieDbApiKey;
    var baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + 
    theMovieDbApiKey + '&language=en-US&query=' + escapedQ + '&page=1&include_adult=false';
    request.get(baseUrl, 'utf8', function(err, response, body) {
      var movieId = JSON.parse(body).results[0].id;
      var baseUrl2 = 'https://api.themoviedb.org/3/movie/' + movieId + '/recommendations?api_key=' + theMovieDbApiKey + '&language=en-US&page=1';
      request.get(baseUrl2, 'utf8', function(err, response, body) {
        var recommendedMovies = JSON.parse(body).results;
        utils.sendResponse(res, 200, JSON.stringify(recommendedMovies), 'application/json');
      });
    });
  }
};

var favoriteActions = {
  'GET': function(req, res) {
    Movie.find(function(err, movies) {
      utils.sendResponse(res, 201, JSON.stringify(movies), 'application/json');
    });
  },
  'POST': function(req, res) {
    var movieData = req.body;
    Movie.findOne({title: movieData.title}, function(err, movie) {
      if (err) {
        console.log(err);
      }
      if (movie === null) {
        var newMovie = new Movie({
          title: movieData.title, 
          poster: movieData.info.Poster,
          year: movieData.info.Year,
          director: movieData.info.Director,
          actors: movieData.info.Actors,
          plot: movieData.info.Plot,
          imdbID: movieData.info.imdbID,
          favoriteCount: 1
        });
        newMovie.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            utils.sendResponse(res, 201, 'movie successfully posted to Db', 'text/html');
          }
        });
      } else {
        var prevFavCount = movie.favoriteCount;
        Movie.findByIdAndUpdate(movie._id, {favoriteCount: prevFavCount + 1}, function(err, movie) {
          utils.sendResponse(res, 201, 'movie successfully updated in the Db', 'text/html');
        });
      }
    });
  }
};



module.exports.movieActions = movieActions;
module.exports.favoriteActions = favoriteActions;