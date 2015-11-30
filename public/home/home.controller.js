// Currently unused, the controller might serve as a way for
// the client to grab the current user's data and serve up
// the data provided by its factory.
//
// Created with modularity in mind, this 'home' feature is used
// to serve up the landing card.

(function() {
  'use strict';

  angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [];

  function HomeCtrl() {
    var self = this;

  }

})();
