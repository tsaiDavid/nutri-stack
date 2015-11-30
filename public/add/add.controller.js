// The **add** controller is used to assist with the creation of new stacks/users
(function() {
  'use strict';

  angular.module('app')
  .controller('AddCtrl', AddCtrl);

  // Controller takes its Factory injection here to gain fn's
  AddCtrl.$inject = ['addFactory', '$state'];

  function AddCtrl(addFactory, $state) {
    var self = this;

    // `self.input` serves as object for storage
    self.input = {};

    self.submit = function() {
      // A new user entry will be created if it cannot be found
      addFactory.createUser(self.input)
      .then(function() {
        // Using that id number, a new stack will be created
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
