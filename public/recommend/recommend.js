angular.module('App.recommend', [])
.controller('recommendCntrl', function recommendCntrl($scope, Movies) {
  $scope.data = {};
  $scope.spicy = 'chili';

  $scope.getMovies = function() {
    Movies.getAll()
    .then(function(movies) {
      $scope.data.movies = movies;
      console.log('$scope.data is now', $scope.data);
    });
  };

  $scope.featureMovie = function(movieTitle) {
    $scope.data.featuredMovie = movieTitle;
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