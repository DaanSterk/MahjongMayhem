require('angular/angular');
require('angular-ui-router');

// Create your app
var app = angular.module('MahjongMayhem', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    //$urlRouterProvider.reloadOnSearch = true;

    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'index.html',
        controller: 'AppCtrl'
    })

        .state('app.index', {
            url: '/test',
            abstract: true,
            templateUrl: 'templates/app/index.html',
            controller: 'AppCtrl'
        })

        .state('app.games', {
            url: "/games",
            templateUrl: "templates/games/index.html",
            controller: "GamesCtrl"
        });

    // For any unmatched url, send to /index
    $urlRouterProvider.otherwise("/");

});