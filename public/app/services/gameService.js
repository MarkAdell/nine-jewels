angular.module('nineJewelsApp')
  .factory('gameService', function($http) {

    function getScoreBoard() {
      return $http.get('api/users');
    }

    function getRandomWord() {
      return $http.get('api/words/');
    }

    function checkSolution(userAnswer, wordId) {
      return $http.get('api/words/check?answer='+userAnswer+'&id='+wordId);
    }

    function getHint(wordId) {
      return $http.get('api/words/hint?id='+wordId);
    }

    return {
      getScoreBoard: getScoreBoard,
      getRandomWord: getRandomWord,
      checkSolution: checkSolution,
      getHint: getHint
    }
    
  });
