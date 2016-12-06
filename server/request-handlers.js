var request = require('request');
var data = require('./data/movieData.js');
var utils = require('./utils.js');
var mongoose = require('mongoose');

var movieModule = require('./db/movie.js');
var database = require('./db/db.js');

var movieData = data.movieData;
var Movie = movieModule.movieModel;
var db = database.db;

var movieActions = {
  'GET': function(req, res) {
    // request.get({url: 'https://www.tastekid.com/api/similar', q: 'kill bill', k: '250318-RecMachi-4S5XC2XN'})
    // .on('response', function(response) {
    //   console.log(response);

    // });

    utils.sendResponse(res, 200, JSON.stringify(movieData), 'application/json');
  },
  'POST': function(req, res) {
    var movieData = req.body;
    Movie.findOne({title: movieData.title}, function(movie) {
      if (movie === null) {
        console.log(movie);
        var newMovie = new Movie({title: movieData.title, 
          information: JSON.stringify(movieData), favoriteCount: 1});
        newMovie.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            utils.sendResponse(res, 201, 'movie successfully posted to Db', 'text/html');
          }
        });
      } else {
        console.log(movie);
      }
    });
  }
};



// var movieModule = require('./db/movie.js');
// var Movie = movieModule.movieModel;

// var movie = new Movie({title: 'Requiem for a Dream'});
// movie.save(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('saved a movie!');
//   }
// });


module.exports.movieActions = movieActions;