angular.module('App.services', [])

.factory('Movies', function($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/movies'
    })
    .then(function(res) {
      console.log('res from server to GET', res);
      return JSON.parse(res.data);
    });
  };

  var getInfo = function(baseUrl) {
    return $http({
      method: 'GET',
      url: baseUrl
    }).then(function(res) {
      console.log('res from OMDB api', res.data);
      return res.data;
    });
  };

  var favoriteMovie = function(movie) {
    return $http({
      method: 'POST',
      url: '/movies',
      data: JSON.stringify(movie)
    })
    .then(function(res) {
      console.log('res from server to ', res);
    });
  };

  var getFavorites = function(movie) {
    return $http({
      method: 'GET',
      url: '/favorites',
    })
    .then(function(res) {
      console.log('res from server with favorites', res.data);
      return res.data;
    });
  };

  return {
    getAll: getAll,
    getInfo: getInfo,
    favoriteMovie: favoriteMovie,
    getFavorites: getFavorites
  };
});