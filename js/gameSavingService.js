'use strict';

app.service('GameSavingService', [function() {
  this.saveGame = function(highscores) {
    localStorage.setItem('wordGame', JSON.stringify(highscores));
  };

  this.loadGame = function() {
    return JSON.parse(localStorage.getItem('wordGame'));
  };

  this.clearGame = function() {
    return localStorage.clear();
  };
}])
