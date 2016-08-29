'use strict';

angular.module('wordGame', ['ui.router'])
  .controller('MainCtrl', ['$scope', 'GameService', function($scope, gameService) {

    gameService.loadGame();

    $scope.saveWord = function(word) {
      $scope.notification = null;
      var isSaved = gameService.isAlreadySaved(word);
      var isInDict = gameService.isInDictionary(word);
      if (isInDict && !isSaved) {
        var score = gameService.getScore(word);
        gameService.highscores.push({word: word, score: score});
        $scope.notification = $scope.newWord + ' is valid, good job! You get ' + score + ' for this word!'
        $scope.error = null;
        $scope.newWord = '';
        gameService.saveGame();
      } else if (!isInDict) {
        $scope.error = 'word is not in dictionary';
      } else if (isSaved) {
        $scope.error = 'you already have found this word';
      }
    }
  }])

  .controller('HighscoresCtrl', ['$scope', 'GameService', function($scope, gameService) {
    gameService.loadGame();

    $scope.highscores = gameService.highscores;
  }])

  .service('GameService', ['$http', 'GameSavingService', function($http, gameSavingService) {
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
  }])

  .service('GameSavingService', [function() {
    this.saveGame = function(highscores) {
      localStorage.setItem('wordGame', JSON.stringify(highscores));
    };

    this.loadGame = function() {
      return JSON.parse(localStorage.getItem('wordGame'));
    };
  }])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
