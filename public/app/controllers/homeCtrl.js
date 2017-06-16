angular.module('nineJewelsApp')
  .controller('homeCtrl', function(userService, $state) {

    var vm = this;

    var userId = userService.getIdFromLocal();

    if(userId) {
      getUserName();
    }

    vm.startGame = function() {
      if(!userId) {
        addUserAndProceed();
      } else {
        updateUserNameAndProceed();
      }
    }

    function getUserName() {
      userService.getUserName(userId)
        .then(function(res) { 
          if(res.data.success) {
            vm.username = res.data.userName.userName;
          } else {
            console.log(res.data.message);
          }
        });
    }

    function addUserAndProceed() {
      userService.addUser(vm.username)
        .then(function(res) {
          if (res.data.success) {
            userService.saveIdToLocal(res.data.userId);
            $state.go('game');
          } else {
            console.log(res.data.message);
          }
      });
    }

    function updateUserNameAndProceed() {
      userService.updateUserName(vm.username, userId)
        .then(function(res) {
          if(res.data.success) {
            $state.go('game');
          } else {
            console.log(res.data.message);
          }
        });
    }


  });
