(function() {
  'use strict';

  angular.module('app')
  .controller('StackCtrl', StackCtrl);

  StackCtrl.$inject = ['stackFactory', '$state', '$stateParams'];

  function StackCtrl(stackFactory, $state, $stateParams) {
    var self = this;
    self.input = {};
    self.user = {};
    self.stacks;

    // Whenever controller is initalized, load appropriate user stacks
    // FIXME: Right now, the stacks are only loading when refreshed
    self.initialize = function() {
      if ($stateParams.username) {
        self.input.username = $stateParams.username;
        self.submit();
      }
    };

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
        $state.go('stacks.list', {username: self.user.username});
      });
    };

    // Move user into the unique stack view based on selected title
    // FIXME: No longer able to load unique stack view
    self.goToStack = function(stackTitle) {
      console.log('username: ', self.user.username);
      $state.go('uniqueStack', {
        username: self.user.username,
        title: stackTitle,
      });
    };

    self.initialize();
  }

})();
