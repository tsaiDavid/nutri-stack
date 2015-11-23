(function() {
  'use strict';

  angular.module('app')
  .factory('stackFactory', stackFactory);

  stackFactory.$inject = ['$http', '$location', '$window'];

  function stackFactory($http, $location, $window) {
    var services = {
      getUserStack: getUserStack,
    };

    return services;

    function getUserStack(username) {
      return $http({
        method: 'GET',
        url: 'api/stack/' + username,
      })
      .then(function(res) {
        console.log('Response from inside getUserStack: ', res);
      });
    }
  }

})();
