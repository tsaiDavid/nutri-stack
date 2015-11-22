(function() {
  'use strict';

  angular.module('app')
  .controller('AddCtrl', AddCtrl);

  AddCtrl.$inject = ['$http'];

  function AddCtrl($http) {
    var self = this;

    // object for storing the input data
    self.supp = {};

    self.submit = function() {
      console.log('Submitting data: ', self.supp);

      // function should take data from the form in the add view
      // post it using $http to the server's back end
      return $http({
        method: 'POST',
        url: '/api/supplements',
        data: self.supp,
      });

      // have the server take care of the routing and saving into the db
    };

  }

})();
