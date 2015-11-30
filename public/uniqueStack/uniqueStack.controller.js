(function() {
  'use strict';

  angular.module('app')
  .controller('UniqueStackCtrl', UniqueStackCtrl);

  UniqueStackCtrl.$inject = ['uniqueStackFactory'];

  function UniqueStackCtrl(uniqueStackFactory) {
    var self = this;

    // `self.title` serves to store the title of the current stack
    self.title;

    // `self.stack` is a placeholder prop for the stack data object returned by the
    // factory method, 'getStackDetails'
    self.stack;

    // `self.user` is an object that serves to store the returned user data after retrieval
    self.user = {};

    // `self.supplement` is an object that serves to store the supplements retrieved
    self.supplement = {};

    self.initialize = function() {
      self.getStackTitle();

      uniqueStackFactory.getUser()
      .then(function(user) {
        self.user = user;
        self.getSupplements(self.user.id);
      });

      uniqueStackFactory.getStackDetails(self.user.id)
      .then(function(stack) {
        self.stack = stack;
      });

    };

    // This method retrieves the unique stack's title
    self.getStackTitle = function() {
      self.title = uniqueStackFactory.getTitle();
    };

    // This method takes the **user_id** and **stack_title** params to use
    // its factory method to retrieve supplements then assigns to controller
    self.getSupplements = function(user_id, stack_title) {
      uniqueStackFactory.getSupplements(self.title)
      .then(function(supps) {
        self.supplements = supps.data;
      });
    };

    // This method will send the form data to factory function for server use
    self.addSupplement = function() {
      uniqueStackFactory.addSupplement(self.user.id, self.supplement)
      .then(function() {
        // after submission, clear out object
        self.supplement = {};
        self.initialize();
      });
    };

    // This method will delete the supplement, given a **supplement_id** param
    self.deleteSupplement = function(supplement_id) {
      uniqueStackFactory.deleteSupplement(self.user.id, supplement_id);
    };

    // Call made to initialize for the functions to be initialized upon controller instantiation
    self.initialize();
  }

})();
