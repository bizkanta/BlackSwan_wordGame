'use strict';

angular.module('wordGame', [])
  .controller('GameCtrl', ['$scope', function($scope) {
    $scope.dictionary = ["ability","able","aboard","about","above","accept","accident","according"];

    $scope.newWords = [];

    function isInDictionary(word) {
      return $scope.dictionary.indexOf(word) >= 0;
    }

    function isInNewWords(newWord) {
      return $scope.newWords.some(function(item) {
        return item.word === newWord;
      });
    }

    function countUniqueLetters(word) {
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

    $scope.saveWord = function(word) {
      if (isInDictionary(word) && !isInNewWords(word)) {
        var letters = countUniqueLetters(word);
        $scope.newWords.push({word: word, score: letters});
        $scope.newWord = '';
      } else if (!isInDictionary(word)){
        $scope.error = 'word is not in dictionary';
      } else if (isInNewWords(word)) {
        $scope.error = 'you already have found this word';
      }
    }
  }]);
