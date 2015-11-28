(function() {
  'use strict';

  angular.module('app')
  .config(config);

  // upon document load, enable mobile sidenav; setting to close on click
  $('.button-collapse').sideNav({closeOnClick: true});

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm',
      })
      .state('add', {
        url: '/stacks/add',
        templateUrl: 'add/add.html',
        controller: 'AddCtrl',
        controllerAs: 'vm',
      })
      .state('stacks', {
        url: '/stacks',
        templateUrl: 'stacks/stacks.html',
        controller: 'StackCtrl',
        controllerAs: 'vm',
      })
      .state('stacks.list', {
        url: '/:username',
        templateUrl: 'stacks/stacks.stackslist.html',
        controller: 'StackCtrl',
        controllerAs: 'vm',
      })
      .state('uniqueStack', {
        url: '/stacks/:username/:title',
        templateUrl: 'uniqueStack/uniqueStack.html',
        controller: 'UniqueStackCtrl',
        controllerAs: 'vm',
      });
  }
})();
