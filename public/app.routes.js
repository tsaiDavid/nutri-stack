// Follows pattern of wrapping Angular components in IIFE.
(function() {
  'use strict';

  // Our Angular module was named 'app', here we attach our config
  angular.module('app')
  .config(config);

  // When document is loaded, enable mobile sidenav
  //  * closeOnClick set to true, when user clicks off, nav will shrink
  $('.button-collapse').sideNav({closeOnClick: true});

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  // Configure the UI Routing
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    // The controllers and controller as syntax is specified in the router,
    // so controllers will only be instantiated once per page load
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

      // **username** is used here as a route param
      .state('stacks.list', {
        url: '/:username',
        templateUrl: 'stacks/stacks.stackslist.html',
        controller: 'StackCtrl',
        controllerAs: 'vm',
      })

      // to get the unique stack, we base it off the **username** route and add
      // the unique **title** that is desired for retrieval
      .state('uniqueStack', {
        url: '/stacks/:username/:title',
        templateUrl: 'uniqueStack/uniqueStack.html',
        controller: 'UniqueStackCtrl',
        controllerAs: 'vm',
      });
  }
})();
