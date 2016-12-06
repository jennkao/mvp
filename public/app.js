var App = angular.module('App', ['App.recommend', 'App.popular', 'App.services', 'ui.router']);

App
.config(function($stateProvider) {
  var recommendState = {
    name: 'recommend',
    url: '/recommend',
    controller: 'recommendCntrl',
    templateUrl: 'recommend/recommend.html'
  };

  var popularState = {
    name: 'popular',
    url: '/popular',
    controller: 'popularCntrl',
    templateUrl: 'popular/popular.html'
  };

  $stateProvider.state(recommendState);
  $stateProvider.state(popularState);
});
