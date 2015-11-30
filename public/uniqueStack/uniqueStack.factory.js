(function() {
  'use strict';

  angular.module('app')
  .factory('uniqueStackFactory', uniqueStackFactory);

  uniqueStackFactory.$inject = ['$http', '$window', '$location', '$state', '$stateParams'];

  function uniqueStackFactory($http, $window, $location, $state, $stateParams) {
    var services = {
      getTitle: getTitle,
      getUser: getUser,
      getStackDetails: getStackDetails,
      getSupplements: getSupplements,
      addSupplement: addSupplement,
      deleteSupplement: deleteSupplement,
    };

    return services;

    // Returns title of current stack to view model
    function getTitle() {
      return $stateParams.title;
    }

    // Given a username, return the user's id
    function getUser() {
      return $http({
        method: 'GET',
        url: 'api/users?username=' + $stateParams.username,
      })
      .then(function(user) {
        // after getting user details, return it to controller
        return user.data;
      });
    }

    // Retrieve stack details from db through our API endpoint
    function getStackDetails(user_id) {
      return $http({
        method: 'GET',

        // Notice the usage of the **user_id** and **title** params
        // The 'title' param is grabbed from the current UI route
        url: 'api/users/' + user_id + '/stacks/' + $stateParams.title,
      })
      .then(function(stack) {

        // Return only the response's data property/object
        return stack.data;
      });
    }

    function getSupplements(user_id) {
      // Based on username, grab the ID
      return $http({
        method: 'GET',
        url: 'api/users/' + user_id + '/stacks/' + $stateParams.title + '/supplements',
      })
      .then(function(supps) {
        return supps;
      });
    }

    // Insert supplement into the pg database
    function addSupplement(user_id, supplement) {
      return $http({
        method: 'POST',
        url: 'api/users/' + user_id + '/stacks/' + $stateParams.title,
        data: supplement,
      });
    }

    function deleteSupplement(user_id, supplement_id) {
      var supplementQuery = '';
      if (supplement_id !== undefined) {
        supplementQuery = '?=' + supplement_id;
      }

      return $http({
        method: 'DELETE',
        url: '/api/users/' + user_id + '/stacks/' + $stateParams.title + '/supplements' + supplementQuery,
      })
      .then(function() {
        $state.go($state.current, {}, {reload: true});
      });
    }
  }

})();
