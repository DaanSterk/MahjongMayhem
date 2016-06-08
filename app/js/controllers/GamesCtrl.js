angular.module('MahjongMayhem')
    .controller('GamesCtrl', ['$scope', '$state', '$http', 'GLOBALS', function($scope, $state, $http, GLOBALS) {

        // -----DEFAULT------
        $scope.pageSize = 12;
        $scope.pageIndex = 0;
        // ------------------

        $scope.templates = ['Dragon', 'Shanghai', 'Snake', 'Rooster', 'Monkey', 'Ram', 'Ox'];
        $scope.states = ['Open', 'Playing', 'Finished'];

        $scope.changeFilterTemplate = function(template) {
            $scope.filterTemplate = template;
            $scope.search();
        }

        $scope.changeFilterState = function(state) {
            if (state) {
                $scope.filterState = state.toLowerCase();
            }
            else {
                $scope.filterState = state;
            }
            $scope.search();
        }

        $scope.search = function() {
            filter = "";
            if ($scope.filterTemplate) {
                filter += '&gameTemplate=' + $scope.filterTemplate;
            }
            if ($scope.filterCreator) {
                filter += '&createdBy=' + $scope.filterCreator;
            }
            if ($scope.filterPlayer) {
                filter += '&player=' + $scope.filterPlayer;
            }
            if ($scope.filterState) {
                filter += '&state=' + $scope.filterState;
            }
            getGames();
        }

        var queryStringBase = '?pageSize=' + $scope.pageSize + '&pageIndex=' + $scope.pageIndex;
        var filter;
        getGames = function() {
            $http.get(GLOBALS.API_URL + '/games' + queryStringBase + filter)
                .then(function(response) {
                    $scope.games = response.data;
                });
        }

        // PAGE LOAD
        getGames();
}]);