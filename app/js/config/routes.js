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
            templateUrl: 'templates/app/index.html'
        })

        .state('games', {
            url: "/games",
            templateUrl: "templates/games/index.html"
        })

        .state('newgame', {
            url: "/games/new",
            templateUrl: "templates/games/new.html"
        })

        .state('login', {
            url: "/login?username?token",
            controller: "LoginCtrl"
        })

        .state('game', {
            url: "/games/game",
            params: {
                id: null,
                spectatorMode: false
            },
            templateUrl: "templates/games/detail"
        })

    // For any unmatched url, send to /index
    $urlRouterProvider.otherwise("/");

});