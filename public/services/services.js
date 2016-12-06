angular.module('App.services', [])

.factory('Movies', function($http) {

  var getAll = function(query) {
    console.log('query in services', JSON.stringify({query: query}));
    return $http({
      method: 'POST',
      url: '/movies',
      data: JSON.stringify({query: query})
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
      url: '/favorites',
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