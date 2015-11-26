(function() {
  'use strict';

  angular.module('app')
  .controller('UniqueStackCtrl', UniqueStackCtrl);

  UniqueStackCtrl.$inject = ['uniqueStackFactory'];

  function UniqueStackCtrl(uniqueStackFactory) {
    var self = this;

    // title is the name of the stack
    self.title;
    self.stack;
    self.supplement = {};

    self.initialize = function() {
      self.getStackTitle();
      uniqueStackFactory.getStackDetails()
      .then(function(stack) {
        self.stack = stack;
      })
      .then(function() {
        self.getSupplements();
      });
    };

    self.getStackTitle = function() {
      self.title = uniqueStackFactory.getTitle();
    };

    self.getSupplements = function() {
      uniqueStackFactory.getSupplements(self.title)
      .then(function(supps) {
        self.supplements = supps.data;
      });
    };

    // submit will send the form data to factory function for server use
    self.submit = function() {
      uniqueStackFactory.addSupplement(self.supplement, self.title)
      .then(function() {
        // after submission, clear out object
        self.supplement = {};
        self.initialize();
      });
    };

    self.deleteSupplement = function(x) {
      console.log(x);
    };

    self.initialize();
  }

})();
