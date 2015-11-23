(function() {
  'use strict';

  angular.module('app')
  .controller('StackCtrl', StackCtrl);

  StackCtrl.$inject = ['stackFactory', '$state'];

  function StackCtrl(stackFactory, $state) {
    var self = this;
    self.input = {};
    self.stacks;

    // After user submits search for stacks by username, we switch to a nested state view
    // Since the controller is loses its data upon reinstantiation, it defaults to the 'stacks' view
    self.submit = function() {
      stackFactory.getUserStack(self.input.username)
      .then(function(array) {
        self.stacks = array;
        $state.go('stacks.list');
      });
    };

    self.goToStack = function(x) {
      console.log(x);
    };
  }

})();
