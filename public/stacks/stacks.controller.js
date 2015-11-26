(function() {
  'use strict';

  angular.module('app')
  .controller('StackCtrl', StackCtrl);

  StackCtrl.$inject = ['stackFactory', '$state'];

  function StackCtrl(stackFactory, $state) {
    var self = this;
    self.input = {};
    self.user = {};
    self.stacks;

    // After user submits search for stacks by username, we switch to a nested state view
    // Since the controller is loses its data upon reinstantiation, it defaults to the 'stacks' view
    self.submit = function() {
      stackFactory.getUser(self.input.username)
      .then(function(user) {
        self.user.id = user.id;
        self.user.username = user.username;
      })
      .then(function() {
        return stackFactory.getUserStack(self.user.id);
      })
      .then(function(array) {
        self.stacks = array;
        self.input.username = '';
        $state.go('stacks.list');
      });
    };

    // Move user into the unique stack view based on selected title
    self.goToStack = function(stackTitle) {
      $state.go('uniqueStack', {
        title: stackTitle,
      });
    };

  }

})();
