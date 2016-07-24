angular.module('MahjongMayhem')
    .controller('GameCtrl', ['$scope', '$state', '$http', 'GLOBALS', function($scope, $state, $http, GLOBALS) {
        var id;

        function getTiles(gameid) {
            if (!gameid) { // Na een refresh vervalt het game id. Terug gaan naar /games.
                $state.go("games");
                return;
            }
            $http.get(GLOBALS.API_URL + '/games/' + gameid + '/tiles')
                .then(function(response) {
                    $scope.tiles = response.data;
                });
        }
        // Page load
        id = $state.params.id;
        getTiles(id);



    }])