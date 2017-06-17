angular.module('nineJewelsApp')
  .factory('gameService', function($http) {

    function getScoreBoard() {
      return $http.get('api/users');
    }

    function getWords() {
      return $http.get('api/words/');
    }

    return {
      getScoreBoard: getScoreBoard,
      getWords: getWords
    }
    
  });
