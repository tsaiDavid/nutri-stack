(function() {
  'use strict';

  angular.module('app')
  .controller('UniqueStackCtrl', UniqueStackCtrl);

  UniqueStackCtrl.$inject = ['uniqueStackFactory'];

  function UniqueStackCtrl(uniqueStackFactory) {
    var self = this;
    self.title;
    self.stack;

    self.initialize = function() {
      self.getStackTitle();
      uniqueStackFactory.getStackDetails()
      .then(function(stack) {
        self.stack = stack;
      });
    };

    self.getStackTitle = function() {
      self.title = uniqueStackFactory.getTitle();
    };

    self.initialize();
  }

})();
