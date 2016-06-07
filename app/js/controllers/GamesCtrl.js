angular.module('MahjongMayhem')
    .controller('GamesCtrl', ['$scope', '$state', '$http', 'GLOBALS', function($scope, $state, $http, GLOBALS) {

        // -----DEFAULT------
        $scope.pageSize = 10;
        $scope.pageIndex = 0;
        // ------------------

        $http.get(GLOBALS.API_URL + '/games?pageSize=' + $scope.pageSize + '&pageIndex=' + $scope.pageIndex)
        .then(function(response) {
            $scope.games = response.data;
        });
}]);