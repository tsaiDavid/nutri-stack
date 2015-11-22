(function() {
  'use strict';

  angular.module('app')
  .controller('AddCtrl', AddCtrl);

  AddCtrl.$inject = ['addFactory'];

  function AddCtrl(addFactory) {
    var self = this;

    // object for storing the input data
    self.supp = {};

    self.submit = function() {
      console.log('Submitting data: ', self.supp);

      addFactory.insertToDB(self.supp)
        .then(function() {
          // after inserting to the DB
        });
    };

  }

})();
