(function() {
  'use strict';

  angular.module('app')
  .factory('addFactory', addFactory);

  addFactory.$inject = ['$http', '$state'];

  function addFactory($http, $state) {
    var services = {
      getUser: getUser,
      createUser, createUser,
      createStack: createStack,
    };

    return services;

    // POST new user to the database
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
      getUser(input.username)
      .then(function(user) {
        return $http({
          method: 'POST',
          url: '/api/users/' + user.id + '/stacks',
          data: input,
        });
      });
    }

  }

})();
