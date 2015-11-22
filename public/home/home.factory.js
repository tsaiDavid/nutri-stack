(function() {
  'use strict';

  angular.module('app')
  .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$http', '$window', '$location'];

  function homeFactory($http, $window, $location) {
    var services = {
      getAll: getAll,
    };

    return services;

    function getAll() {
      return $http({
        method: 'GET',
        url: '/api/supplements',
      });
    }
  }

})();
