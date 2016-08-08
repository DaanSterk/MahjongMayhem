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
        localStorage.removeItem('user.username');
        localStorage.removeItem('user.token');
    }

    $scope.isLoggedIn = function() {
        return localStorage.getItem('user.username') !== null;
    }

    $scope.getUsername = function() {
        return localStorage.getItem('user.username');
    }

}]);