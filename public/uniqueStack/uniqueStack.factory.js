(function() {
  'use strict';

  angular.module('app')
  .factory('uniqueStackFactory', uniqueStackFactory);

  uniqueStackFactory.$inject = ['$http', '$window', '$location', '$stateParams'];

  function uniqueStackFactory($http, $window, $location, $stateParams) {
    var services = {
      getTitle: getTitle,
      addSupplement: addSupplement,
    };

    return services;

    // returns title of current stack to view model
    function getTitle() {
      return $stateParams.title;
    }

    function addSupplement() {

    }
  }

})();
