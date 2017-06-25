angular
  .module('nineJewelsApp', [
    'ui.router'
  ])
  .run(function($rootScope, $state, $stateParams, $location) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$locationChangeStart', function() {
      ga('set', 'page', $location.path());
      ga('send', 'pageview');
    });
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
  });
