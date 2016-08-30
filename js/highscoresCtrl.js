'use strict';

app.controller('HighscoresCtrl', ['$scope', 'GameService', function($scope, gameService) {
  gameService.loadGame();
  $scope.highscores = gameService.highscores;
}])
