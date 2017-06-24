angular.module('nineJewelsApp')
  .controller('gameCtrl', function(userService, gameService, $state, $timeout) {

    var vm = this;

    vm.flashVisible = false;
    vm.status = 'default';
    vm.hintCount = 0;

    var loadedWord;
    var hintUsed = false;
    var userId = userService.getIdFromLocal();

    getRandomWord();
    getScoreBoard();

    vm.submitWord = function() {
      var userAnswer = vm.userAnswer;
      var wordId = loadedWord.id;
      checkSolution(userAnswer, wordId);
    }

    vm.getAnotherWord = function() {
      hintUsed = false;
      getRandomWord();
    }

    vm.showHint = function() {
      var wordId = loadedWord.id;
      getAndShowHint(wordId);
      hintUsed = true;
    }

    vm.titleClick = function() {
      $state.go('home');
    }

    function getAndShowHint(wordId) {
      gameService.getHint(wordId)
        .then(function(res) {
          if(res.data.success) {
            var hint = res.data.hint.toLowerCase();
            vm.userAnswer = hint;
          } else {
            console.log(res.data.error);
          }
        })
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
      if(hintUsed) {
        vm.hintCount++;
        hintUsed = false;
        if(vm.hintCount === 3) {
          updateUserScore(userId);
          getScoreBoard();
          vm.hintCount = 0;
        }
      } else {
        updateUserScore(userId);
        getScoreBoard();
      }
      getRandomWord();
    }

    function handleWrongSolution() {
      flash('Wrong!');
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
      vm.flashVisible = true;
      vm.status = message;
      $timeout(function() {
        vm.flashVisible = false;
      }, 1500);
    }

  });
