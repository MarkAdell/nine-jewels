angular
  .module('nineJewelsApp', [
    'ui.router'
  ])
  .run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })
  .config(function($stateProvider, $locationProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/pages/home.html',
        controller: 'homeCtrl',
        controllerAs: 'vm',
        data: {
          pageTitle: 'home'
        }
      })
      .state('game', {
        url: '/play',
        templateUrl: 'app/views/pages/game.html',
        controller: 'gameCtrl',
        controllerAs: 'vm',
        data: {
          pageTitle: 'game'
        }
      })
      .state('invalid', {
        url: '/invalid',
        templateUrl: 'app/views/pages/invalid.html',
        data: {
          pageTitle: 'invalid url'
        }
      })

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/invalid');
  })
