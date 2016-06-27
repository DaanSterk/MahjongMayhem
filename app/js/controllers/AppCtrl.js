angular.module('MahjongMayhem').controller('AppCtrl', ['$scope', '$state', '$stateParams', '$window', function($scope, $state, $stateParams, $window) {

    $scope.welcome_msg = 'Welcome to Mahjong Mayhem!';

    $scope.isActive = function(viewLocation) {
        console.log(viewLocation);
        return viewLocation === $location.path();
    }

    $scope.login = function() {
        var authUrl = "http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=";
        var callbackUrl = "http://localhost:3000/%23/login";
        $window.location.href = authUrl + callbackUrl;
    }

    $scope.logout = function() {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    }

    $scope.isLoggedIn = function() {
        return localStorage.getItem('username') !== null;
    }

    $scope.getUsername = function() {
        return localStorage.getItem('username');
    }

}]);