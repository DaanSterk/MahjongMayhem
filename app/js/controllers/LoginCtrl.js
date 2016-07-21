angular.module('MahjongMayhem').controller('LoginCtrl', ['$scope', '$state', function($scope, $state) {

    // If returned from callback...
    if ($state.params.username && $state.params.token) {
        localStorage.setItem('user.username', $state.params.username);
        localStorage.setItem('user.token', $state.params.token);
        $state.go("index");
    }

}]);