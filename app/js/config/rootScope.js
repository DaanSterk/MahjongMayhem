angular.module("MahjongMayhem")

.run(function($rootScope, $state) {
    $rootScope.showView = function(name) {
        $state.go(name);
    }

    $rootScope.capitalize = function(s)
    {
        if (s) {
            s =  s[0].toUpperCase() + s.slice(1);
        }
        return s;
    }

})