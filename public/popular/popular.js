angular.module('App.popular', [])
.controller('popularCntrl', function recommendCntrl($scope, Movies) {
  $scope.data = {};

  $scope.getFavorites = function() {
    Movies.getFavorites()
    .then(function(movies) {
      $scope.data.favorites = movies;
    });
  };

  $scope.getFavorites();
});