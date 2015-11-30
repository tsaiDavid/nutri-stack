// This factory works in conjunction with the stacks controller to provide
// the methods necessary for the controller to retrieve stack data from the
// server and the postgreSQL database.
(function() {
  'use strict';

  angular.module('app')
  .factory('stackFactory', stackFactory);

  stackFactory.$inject = ['$http'];

  function stackFactory($http) {
    var services = {
      getUser: getUser,
      getUserStack: getUserStack,
    };

    return services;

    // Given a username, return the user's id
    function getUser(username) {
      // Perform a GET request to the server, passing in the username query string
      return $http({
        method: 'GET',
        url: 'api/users?username=' + username,
      })
      .then(function(user) {
        if (!user) {
          return null;
        }

        // After getting user data, return it to controller
        return user.data;
      });
    }

    // Get all stacks based on a user's id
    function getUserStack(user_id) {
      // Function takes in **user_id** as a URL param
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
