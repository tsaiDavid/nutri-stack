(function() {
  'use strict';

  angular.module('app')
  .controller('StackCtrl', StackCtrl);

  StackCtrl.$inject = ['stackFactory'];

  function StackCtrl(stackFactory) {
    var self = this;
    self.input = {};

    self.submit = function() {
      console.log('Logging from StackCtrl, submit: ', self.input.username);
      stackFactory.getUserStack(self.input.username);
    };
  }

})();
