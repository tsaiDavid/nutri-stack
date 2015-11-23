(function() {
  'use strict';

  angular.module('app')
  .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl',
      })
      .state('add', {
        url: '/add',
        templateUrl: 'add/add.html',
        controller: 'AddCtrl',
      })
      .state('stacks', {
        url: '/stacks',
        templateUrl: 'stacks/stacks.html',
        controller: 'StackCtrl',
      });

    // TODO: Add a unique/params based routing for each stack that user pulls up
  }
})();
