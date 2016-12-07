angular.module('App.services', [])
.factory('Movies', function($http) {
  var getAll = function(query) {
    return $http({
      method: 'POST',
      url: '/movies',
      data: JSON.stringify({query: query})
    })
    .then(function(res) {
      return JSON.parse(res.data);
    });
  };

  //note to self: why am i sending a 
  //get request to API here when I am 
  //going through my server for the other 
  //API request..
  var getInfo = function(baseUrl) {
    return $http({
      method: 'GET',
      url: baseUrl
    }).then(function(res) {
      return res.data;
    });
  };

  var favoriteMovie = function(movie) {
    return $http({
      method: 'POST',
      url: '/favorites',
      data: JSON.stringify(movie)
    });
  };

  var getFavorites = function(movie) {
    return $http({
      method: 'GET',
      url: '/favorites',
    })
    .then(function(res) {
      return JSON.parse(res.data);
    });
  };

  return {
    getAll: getAll,
    getInfo: getInfo,
    favoriteMovie: favoriteMovie,
    getFavorites: getFavorites
  };
});