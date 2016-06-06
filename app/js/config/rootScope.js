angular.module("MahjongMayhem")

.run(function($rootScope, $state) {
    $rootScope.showView = function(name) {
        $state.go(name);
    }
})