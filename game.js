'use strict';

angular.module('wordGame', [])
  .controller('GameCtrl', ['$scope', 'GameService', function($scope, gameService) {

    $scope.highScores = gameService.highScores;

    $scope.saveWord = function(word) {
      var isSaved = gameService.isAlreadySaved(word);
      var isInDict = gameService.isInDictionary(word);
      if (isInDict && !isSaved) {
        var score = gameService.getScore(word);
        gameService.highScores.push({word: word, score: score});
        $scope.newWord = '';
        $scope.error = null;
      } else if (!isInDict) {
        $scope.error = 'word is not in dictionary';
      } else if (isSaved) {
        $scope.error = 'you already have found this word';
      }
    }
  }])
  .service('GameService', [function() {
    this.highScores = [];
    this.dictionary = ["ability","able","aboard","about","above","accept","accident","according"];

    this.isInDictionary = function(word) {
      return this.dictionary.indexOf(word) >= 0;
    };

    this.isAlreadySaved = function(newWord) {
      return this.highScores.some(function(item) {
        return item.word === newWord;
      });
    };

    this.getScore = function(word) {
      return this.countUniqueLetters(word);
    }

    this.countUniqueLetters = function(word) {
      Object.size = function(obj) {
      var size = 0;
      for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
          size++;
        }
      }
      return size;
      }

      var letters = new Object;
      for(var i = 0; i < word.length; i++) {
        var letter = word.charAt(i);
        letters[letter] = (isNaN(letters[letter]) ? 1 : letters[letter] + 1);
      }
      return Object.size(letters);
    }
  }]);
