(function() {
  'use strict';

  angular.module('app')
  .factory('uniqueStackFactory', uniqueStackFactory);

  uniqueStackFactory.$inject = ['$http', '$window', '$location', '$stateParams'];

  function uniqueStackFactory($http, $window, $location, $stateParams) {
    var services = {
      getTitle: getTitle,
      getStackDetails: getStackDetails,
      getSupplements: getSupplements,
      addSupplement: addSupplement,
    };

    return services;

    // returns title of current stack to view model
    function getTitle() {
      return $stateParams.title;
    }

    // retrieve stack details from db through our API endpoint
    function getStackDetails() {
      return $http({
        method: 'GET',
        url: 'api/stack/' + $stateParams.title,
      })
      .then(function(stack) {
        console.log(stack.data);

        // return only the response's data property/object
        return stack.data;
      });
    }

    function getSupplements(stackTitle) {
      return $http({
        method: 'GET',
        url: 'api/supplements/' + stackTitle,
      })
      .then(function(supps) {
        return supps;
      });
    }

    // insert supplement into the pg database
    function addSupplement(supplement, stackTitle) {
      return $http({
        method: 'POST',
        url: 'api/stack/' + stackTitle,
        data: supplement,
      });
    }
  }

})();
