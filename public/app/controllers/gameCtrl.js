angular.module('nineJewelsApp')
  .controller('gameCtrl', function(userService, gameService, $state, $timeout) {

    var vm = this;

    var loadedWord;

    var userId = userService.getIdFromLocal();

    getRandomWord();
    getScoreBoard();

    vm.submitWord = function() {
      var userAnswer = vm.userAnswer;
      var wordId = loadedWord.id;
      checkSolution(userAnswer, wordId);
    }

    function checkSolution(userAnswer, wordId) {
      gameService.checkSolution(userAnswer, wordId)
        .then(function(res) {
          if(res.data.success) {
            if(res.data.correct) {
              handleCorrectSolution();
            } else {
              handleWrongSolution();
            }
          } else {
            console.log(res.data.message);
          }
      }); 
    }

    function handleCorrectSolution() {
      flash('Correct!');
      updateUserScore(userId);
      getRandomWord();
      getScoreBoard();
    }

    function handleWrongSolution() {
      flash('Wrong!');
    }

    vm.getAnotherWord = function() {
      getRandomWord();
    }

    function getRandomWord() {
      vm.userAnswer = '';
      gameService.getRandomWord()
        .then(function(res) {
          if(res.data.success) {
            loadedWord = res.data.word;
            vm.shuffledWord = loadedWord.shuffledWord;
          } else {
            console.log(res.data.message);
          }
        });
    }

    function getScoreBoard() {
      gameService.getScoreBoard()
        .then(function(res) {
          if(res.data.success) {
            vm.scoreBoard = [];
            res.data.users.forEach(function(user) {
              if(user.userName.length) {
                vm.scoreBoard.push(user);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
    }

    function updateUserScore() {
      userService.updateUserScore(userId)
        .then(function(res) {
          if(!res.data.success) {
            console.log(res.data.message);
          }
        });
    }

    function flash(message) {
      vm.status = message;
      $timeout(function() {
        vm.status = '';
      }, 1500);
    }

  });
