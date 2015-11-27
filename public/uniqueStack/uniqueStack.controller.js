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
    self.user = {};
    self.supplement = {};

    self.initialize = function() {
      self.getStackTitle();

      uniqueStackFactory.getStackDetails(self.user.id)
      .then(function(stack) {
        self.stack = stack;
      })
      .then(function() {
        self.getSupplements();
      });

      uniqueStackFactory.getUser()
      .then(function(user) {
        self.user = user;
      });
    };

    self.getStackTitle = function() {
      self.title = uniqueStackFactory.getTitle();
    };

    self.getSupplements = function(user_id, stack_title) {
      uniqueStackFactory.getSupplements(self.title)
      .then(function(supps) {
        self.supplements = supps.data;
      });
    };

    // submit will send the form data to factory function for server use
    self.addSupplement = function() {
      uniqueStackFactory.addSupplement(self.user.id, self.supplement)
      .then(function() {
        // after submission, clear out object
        self.supplement = {};
        self.initialize();
      });
    };

    self.deleteSupplement = function(supplement_id) {
      uniqueStackFactory.deleteSupplement(self.user.id, supplement_id);
    };

    self.initialize();
  }

})();
