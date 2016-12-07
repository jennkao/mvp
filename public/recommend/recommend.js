angular.module('App.recommend', [])
.controller('recommendCntrl', function recommendCntrl($scope, Movies) {
  $scope.data = {};

  $scope.searchRecMovies = function() {
    Movies.getAll($scope.data.query)
    .then(function(movies) {
      $scope.data.movies = movies;
    });
  };

  $scope.featureMovie = function(movie) {
    $scope.data.featuredMovie = movie;
    var movieTitleAPI = movie.title.split(' ').join('+');
    var baseUrl = 'http://www.omdbapi.com/?';
    baseUrl += 't=' + movieTitleAPI + '&plot=short&r=json';
    Movies.getInfo(baseUrl).then(function(movieInfo) {
      $scope.data.featuredMovie.info = movieInfo;
    });
  };

  $scope.favorite = function(movie) {
    Movies.favoriteMovie(movie).then(function() {
      console.log('successfully posted to the db');
    });
  };
});