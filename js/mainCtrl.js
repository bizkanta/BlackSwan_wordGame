'use strict';

app.controller('MainCtrl', ['$scope', 'GameService', function($scope, gameService) {

  gameService.loadGame();

  $scope.saveWord = function(word) {
    $scope.notification = null;
    var isSaved = gameService.isAlreadySaved(word);
    var isInDict = gameService.isInDictionary(word);
    if (isInDict && !isSaved) {
      var score = gameService.getScore(word);
      gameService.highscores.push({word: word, score: score});
      $scope.notification = $scope.newWord + ' is valid, good job! You get ' + score + ' points for this word!'
      $scope.error = null;
      $scope.newWord = '';
      gameService.saveGame();
    } else if (!isInDict) {
      $scope.error = 'this word is not in the dictionary!';
    } else if (isSaved) {
      $scope.error = 'you already have found this word!';
    }
  }
}])
