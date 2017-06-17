angular.module('nineJewelsApp')
  .controller('gameCtrl', function(userService, gameService, $state, $timeout) {

    var vm = this;

    
    var words = [];
    var randomWord = "";

    var userId = userService.getIdFromLocal();

    getWords();
    getScoreBoard();

    vm.submitWord = function() {
      var userAnswer = vm.userAnswer.toLowerCase();
      var correctAnswer = randomWord.word.toLowerCase();
      if(userAnswer === correctAnswer) {
        vm.userAnswer = '';
        flash('Correct!');
        updateUserScore(userId);
        pickARandomWord();
        getScoreBoard();
      } else {
        flash('Wrong!');
      }
    }

    vm.getAnotherWord = function() {
      pickARandomWord();
    }

    function getWords() {
      gameService.getWords()
        .then(function(res) {
          if(res.data.success) {
            words = res.data.words;
            pickARandomWord();
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

    function pickARandomWord() {
      var numberOfWords = words.length;
      var randomIndex = Math.floor((Math.random() * numberOfWords));
      randomWord = words[randomIndex];
      vm.shuffledWord = randomWord.shuffledWord;
    }

    function flash(message) {
      vm.status = message;
      $timeout(function() {
        vm.status = '';
      }, 1500);
    }





  });
