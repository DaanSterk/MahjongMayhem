angular.module('MahjongMayhem').controller('AppCtrl', ['$scope', '$state', function($scope, $state) {

    $scope.welcome_msg = 'Welcome to Mahjong Mayhem!';

    $scope.isActive = function(viewLocation) {
        console.log(viewLocation);
        return viewLocation === $location.path();
    }
}]);