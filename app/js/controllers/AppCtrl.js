angular.module('MahjongMayhem').controller('AppCtrl', ['$scope', '$state', function($scope, $state) {
    $scope.welcome_msg = 'Welcome to Mahjong Mayhem!';
    $scope.showGames = function() {
        $state.go('app.games');
    }
}]);