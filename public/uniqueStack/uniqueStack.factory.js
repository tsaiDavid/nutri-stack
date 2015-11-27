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
      deleteSupplement: deleteSupplement,
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
        url: 'api/users/' + 1 + '/stacks/' + $stateParams.title,
      })
      .then(function(stack) {
        console.log('*** stack data', stack.data);

        // return only the response's data property/object
        return stack.data;
      });
    }

    function getSupplements(stackTitle) {
      return $http({
        method: 'GET',
        url: 'api/users/' + 1 + '/stacks/' + stack_title + '/supplements',
      })
      .then(function(supps) {
        return supps;
      });
    }

    // insert supplement into the pg database
    function addSupplement(stack_title, supplement) {
      return $http({
        method: 'POST',
        url: 'api/users/' + 1 + '/stacks/' + stack_title,
        data: supplement,
      });
    }

    function deleteSupplement(stack_title, supplement_id) {
      var supplementQuery = '';
      if (supplement_id !== undefined) {
        supplementQuery = '?=' + supplement_id;
      }

      var stackDetails = getStackDetails();

      console.log(stackDetails);

      return $http({
        method: 'DELETE',
        url: '/api/users/' + 1 + '/stacks/' + stack_title + '/supplements' + supplementQuery,
      });
    }
  }

})();
