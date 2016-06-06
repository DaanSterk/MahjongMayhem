angular.module("MahjongMayhem")

.config(function($stateProvider, $urlRouterProvider) {

    //$urlRouterProvider.reloadOnSearch = true;

    $stateProvider

    //.state('app', {
    //    url: '/app',
    //    abstract: true,
    //    templateUrl: 'index.html',
    //    controller: 'AppCtrl'
    //})

        .state('index', {
            url: '/',
            templateUrl: 'templates/app/index.html',
            controller: 'AppCtrl'
        })

        .state('games', {
            url: "/games",
            templateUrl: "templates/games/index.html",
            controller: "GamesCtrl"
        });

    // For any unmatched url, send to /index
    $urlRouterProvider.otherwise("/");

});