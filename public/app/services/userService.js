angular.module('nineJewelsApp')
  .factory('userService', function($http) {

    function getIdFromLocal() {
      return localStorage.userId;
    }

    function saveIdToLocal(id) {
      localStorage.setItem("userId", id);
    }

    function addUser(userName) {
      return $http.post('/api/users/', {userName: userName});
    }

    function updateUserName(userName, userId) {
      return $http.put('/api/users/', {userName: userName, userId, userId})
    }

    function updateUserScore(userId) {
      return $http.put('/api/users/score/', {userId: userId});
    }

    function getUserName(userId) {
      return $http.get('/api/users/' + userId);
    }

    return {
      getIdFromLocal: getIdFromLocal,
      saveIdToLocal: saveIdToLocal,
      addUser: addUser,
      updateUserName: updateUserName,
      getUserName: getUserName,
      updateUserScore: updateUserScore
    };
    
  });
