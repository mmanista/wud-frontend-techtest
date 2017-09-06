(function() {
  'use strict';

  angular
    .module('wud.techtest')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'app/states/main/main.html'
      })
      .state('main.home', {
        url: '/',
        templateUrl: 'app/states/main/home/home.html',
        data: {
          header: "Home"
        },
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .state('main.users', {
        url: '/users',
        templateUrl: 'app/states/main/users/users.html',
        data: {
          header: "Users"
        },
        controller: 'UsersController',
        controllerAs: 'users'
      })
      .state('main.testTab', {
        url: '/testTab',
        templateUrl: 'app/states/main/test-tab/test.tab.html',
        data: {
          header: "Dynamic routing test tab"
        },
        controller: 'TestTabController',
        controllerAs: 'testTab'
      });
    $urlRouterProvider.otherwise('/');
  }

})();
