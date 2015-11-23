(function() {
  'use strict';

  angular.module('app')
  .factory('addFactory', addFactory);

  addFactory.$inject = ['$http'];

  function addFactory($http) {
    var services = {
      insertToDB: insertToDB,
    };

    return services;

    // function inserts data from add form into db
    function insertToDB(data) {
      // the server handles saving to db
      return $http({
        method: 'POST',
        url: '/api/stack',
        data: data,
      });
    }
  }

})();
