(function() {
  'use strict';

  angular.module('app')
  .controller('StackCtrl', StackCtrl);

  StackCtrl.$inject = ['stackFactory', '$state', '$stateParams'];

  function StackCtrl(stackFactory, $state, $stateParams) {
    var self = this;

    // `self.input` is an object that stores user input
    self.input = {};

    // `self.user` is an object that stores the returned user data after submit is called
    self.user = {};

    // `self.stacks` is placeholder for the array of stacks returned by the 'getUserStack' call
    self.stacks;

    // Whenever controller is initalized, load appropriate user stacks
    self.initialize = function() {
      // Looking at the current state's params, if there's a username,
      // assign the user input field and submit, this is used if a user reloads the page
      // at the same route
      if ($stateParams.username) {
        self.input.username = $stateParams.username;
        self.submit();
      }
    };

    // After user submits search for stacks by username, we switch to a nested state view
    // Since the controller is loses its data upon reinstantiation, it defaults to the 'stacks' view
    self.submit = function() {
      // Retrieve user data using factory's method
      stackFactory.getUser(self.input.username)
      .then(function(user) {
        if (!user) {
          self.input.username = '';
          $state.go('notfound');

        } else {
          // The returned object can be stored onto the controller's `self.user` object
          self.user.id = user.id;
          self.user.username = user.username;
        }
      })
      .then(function() {
        // Using the retrieved user id, we retrieve all associated stacks
        return stackFactory.getUserStack(self.user.id);
      })

      // Take the array and assign to stacks
      .then(function(array) {
        // Store returned array for ng-repeat by stacks.stacklist.html
        self.stacks = array;

        // Clear out the input field in the search field
        self.input.username = '';

        // Use `$state` to change state to nested stacks.list view, using username param
        // for UI routing
        $state.go('stacks.list', {username: self.user.username});
      });
    };

    // Function moves user into the unique stack view based on selected title
    self.goToStack = function(stackTitle) {
      // Uses `$state` to change state, passing in params to be used for UI routing
      $state.go('uniqueStack', {
        username: self.user.username,
        title: stackTitle,
      });
    };

    self.initialize();
  }

})();
