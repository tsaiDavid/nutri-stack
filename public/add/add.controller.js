(function() {
  'use strict';

  angular.module('app')
  .controller('AddCtrl', AddCtrl);

  // controller takes its Factory injection here to gain fn's
  AddCtrl.$inject = ['addFactory'];

  function AddCtrl(addFactory) {
    var self = this;

    // objects to store user and stack input data
    self.input = {};

    self.submit = function() {
      addFactory.insertToDB(self.input)
        .then(function() {
          // after inserting to the DB
        });
    };

  }

})();
