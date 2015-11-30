// The home factory is currently being unused - future use case would
// be to allow for user login or return random stacks
(function() {
  'use strict';

  angular.module('app')
  .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$http'];

  function homeFactory($http) {
    var services = {
    };

    return services;

  }

})();
