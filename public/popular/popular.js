angular.module('App.popular', [])
.controller('popularCntrl', function recommendCntrl($scope, Movies) {
  $scope.data = {};
  $scope.spicy = 'jalapeno';

  $scope.getFavorites = function() {
    Movies.getFavorites()
    .then(function(movies) {
      $scope.data.favorites = movies;
      console.log('favs', $scope.data.favorites);
    });
  };

  $scope.getFavorites();
});