'use strict';

app.service('GameService', ['$http', 'GameSavingService', function($http, gameSavingService) {
  this.highscores = [];
  this.dictionary = [];
  var self = this;

  $http.get('dictionary.json').then(function(response) {
      self.dictionary = response.data;
    }).catch(function(err) {
      console.log(err);
    });

  this.isInDictionary = function(word) {
    return this.dictionary.indexOf(word) >= 0;
  };

  this.isAlreadySaved = function(newWord) {
    return this.highscores.some(function(item) {
      return item.word === newWord;
    });
  };

  this.getScore = function(word) {
    return this.countUniqueLetters(word);
  };

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
  };

  this.saveGame = function() {
    gameSavingService.saveGame(this.highscores);
  };

  this.loadGame = function() {
    this.highscores = gameSavingService.loadGame() || [];
  };

  this.clearGame = function() {
    gameSavingService.clearGame();
  }
}])
