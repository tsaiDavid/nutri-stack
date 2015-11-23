(function() {
  'use strict';

  angular.module('app')
  .controller('UniqueStackCtrl', UniqueStackCtrl);

  UniqueStackCtrl.$inject = ['uniqueStackFactory'];

  function UniqueStackCtrl(uniqueStackFactory) {
    var self = this;
    self.title;

    self.initialize = function() {
      self.getStackTitle();
    };

    self.getStackTitle = function() {
      self.title = uniqueStackFactory.getTitle();
    };

    self.initialize();
  }

})();
