angular.module('nineJewelsApp')
  .factory('userService', function($http) {

    function getIdFromLocal() {
      return localStorage.userId;
    }

    function saveIdToLocal(id) {
      localStorage.setItem("userId", id);
    }

    return {
      getIdFromLocal: getIdFromLocal,
      saveIdToLocal: saveIdToLocal
    };
    
  });
