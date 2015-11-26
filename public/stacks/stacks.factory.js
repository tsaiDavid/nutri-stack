(function() {
  'use strict';

  angular.module('app')
  .factory('stackFactory', stackFactory);

  stackFactory.$inject = ['$http', '$location', '$window'];

  function stackFactory($http, $location, $window) {
    var services = {
      getUser: getUser,
      getUserStack: getUserStack,
    };

    return services;

    // Given a username, return the user's id
    function getUser(username) {
      return $http({
        method: 'GET',
        url: 'api/users?username=' + username,
      })
      .then(function(user) {
        // after getting user details, return it to controller
        return user.data;
      });
    }

    // Get all stacks based on a user's id
    function getUserStack(user_id) {
      return $http({
        method: 'GET',
        url: 'api/users/' + user_id + '/stacks',
      })
      .then(function(res) {
        return res;
      });
    }
  }

})();
