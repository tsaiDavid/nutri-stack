// The add factory provides the methods used by the add controller, which is
// created and destroyed as necessary when a user is attempting to add a stack
(function() {
  'use strict';

  angular.module('app')
  .factory('addFactory', addFactory);

  addFactory.$inject = ['$http'];

  function addFactory($http) {
    var services = {
      getUser: getUser,
      createUser, createUser,
      createStack: createStack,
    };

    return services;

    // POST new user to the database
    // data is passed in from controller as object
    function createUser(input) {
      return $http({
        method: 'POST',
        url: 'api/users',
        data: input,
      });
    }

    // GET user id based on their username
    function getUser(username) {
      return $http({
        // Request includes a username querystring
        method: 'GET',
        url: 'api/users?username=' + username,
      })
      .then(function(user) {
        // after getting user details, return it to controller
        return user.data;
      });
    }

    // POST new stack to the database
    function createStack(input) {
      // given the input, take the username and retrieve their id from DB
      getUser(input.username)
      .then(function(user) {
        return $http({
          method: 'POST',

          // Request includes a **user_id** param to pull all their specific stacks
          url: '/api/users/' + user.id + '/stacks',
          data: input,
        });
      });
    }

  }

})();
