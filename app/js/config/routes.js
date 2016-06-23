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
            url: "/login",
            templateUrl: "templates/app/login.html"
        })

    // For any unmatched url, send to /index
    $urlRouterProvider.otherwise("/");

});