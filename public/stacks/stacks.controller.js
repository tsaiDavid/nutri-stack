(function() {
  'use strict';

  angular.module('app')
  .controller('StackCtrl', StackCtrl);

  StackCtrl.$inject = ['stackFactory'];

  function StackCtrl(stackFactory) {
    var self = this;
    self.input = {};
    self.stacks;

    self.submit = function() {
      stackFactory.getUserStack(self.input.username)
      .then(function(array) {
        self.stacks = array;
      });
    };
  }

})();
