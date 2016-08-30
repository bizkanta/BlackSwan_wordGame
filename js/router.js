'use strict';

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('mainpage', {
      url: '/',
      templateUrl: './templates/main.html',
      controller: 'MainCtrl'
    })
    .state('highscores', {
      url: '/highscores',
      templateUrl: './templates/highscores.html',
      controller: 'HighscoresCtrl'
    })
}]);
