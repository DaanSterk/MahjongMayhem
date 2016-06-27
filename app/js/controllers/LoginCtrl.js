angular.module('MahjongMayhem').controller('LoginCtrl', ['$scope', '$state', function($scope, $state) {

    // If returned from callback...
    if ($state.params.username && $state.params.token) {
        localStorage.setItem('username', $state.params.username);
        localStorage.setItem('token', $state.params.token);
        $state.go("index");
    }

}]);