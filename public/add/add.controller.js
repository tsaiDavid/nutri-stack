(function() {
  'use strict';

  angular.module('app')
  .controller('AddCtrl', AddCtrl);

  // controller takes its Factory injection here to gain fn's
  AddCtrl.$inject = ['addFactory', '$state'];

  function AddCtrl(addFactory, $state) {
    var self = this;

    // objects to store user and stack input data
    self.input = {};

    self.submit = function() {
      // a new user entry will be created if it cannot be found
      addFactory.createUser(self.input)
      .then(function() {
        // using that id number, a new stack will be created
        return addFactory.createStack(self.input);
      })
      .then(function() {
        $state.go('uniqueStack', {
          username: self.input.username,
          title: self.input.stacktitle,
        });
      });
    };

  }

})();
