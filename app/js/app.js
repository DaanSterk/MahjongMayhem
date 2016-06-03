require('angular/angular');
require('angular-ui-router');

// Create your app
var app = angular.module('MahjongMayhem', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('games', {
            url: "/games",
            templateUrl: "templates/games/index.html",
            controller: "GamesCtrl"
        });

    // For any unmatched url, send to /index
    $urlRouterProvider.otherwise("/");

});