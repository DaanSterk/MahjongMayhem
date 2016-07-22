angular.module('MahjongMayhem')
    .controller('GamesCtrl', ['$scope', '$state', '$http', 'GLOBALS', function($scope, $state, $http, GLOBALS) {

        // -----DEFAULT------
        $scope.pageSize = 100;
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

        var filter;
        getGames = function() {
            var queryStringBase = '?pageSize=' + $scope.pageSize + '&pageIndex=' + $scope.pageIndex;
            $http.get(GLOBALS.API_URL + '/games/' + queryStringBase + filter)
                .then(function(response) {
                    $scope.games = response.data;
                });
        }

        $scope.newGame = function() {
            $http.post(GLOBALS.API_URL + '/games', $scope.game)
                .then(function(response) {
                    $state.go('games');
            });
        }

        $scope.joinGame = function(gameid) {
            $http.post(GLOBALS.API_URL + '/games/' + gameid + '/players', {})
                .then(function(response) {
                    $state.reload();
                    // $state.go("game", { id : gameid });
                });
        }

        $scope.isJoinable = function(game) {
            var username = localStorage.getItem("user.username");

            if (game.state === "playing"
                || username === null
                || game.createdBy._id === username
                || game.players.length === game.maxPlayers
                || playerCollectionContains(game.players, username)) {
                return false;
            }

            return true;
        }

        $scope.startGame = function(gameid) {
            $http.post(GLOBALS.API_URL + '/games/' + gameid + '/start', {})
                .then(function(response) {
                    $state.reload();
                });
        }

        $scope.isStartable = function(game) {
            var username = localStorage.getItem("user.username");

            if (game.state !== "open"
                || game.createdBy._id !== username
                || game.players.length < game.minPlayers) {
                return false;
            }

            return true;
        }

        $scope.deleteGame = function(gameid) {
            $http.delete(GLOBALS.API_URL + '/games/' + gameid, {})
                .then(function(response) {
                    $state.reload();
                });
        }

        $scope.isDeletable = function(game) {
            var username = localStorage.getItem("user.username");

            if (game.state !== "playing"
                && game.createdBy._id === username) {

                return true;
            }

            return false;
        }

        $scope.playGame = function(gameid) {
            $state.go("game", { id: gameid} );
        }

        $scope.isPlayable = function(game) {
            var username = localStorage.getItem("user.username");

            if (game.state !== 'playing'
                || !playerCollectionContains(game.players, username)) {
                return false;
            }

            return true;
        }

        function playerCollectionContains(collection, item) { // Determine if player e-mail address is in game players collection.
            for (var i = 0; i < collection.length; i++) {
                if (collection[i]._id === item) {
                    return true;
                }
            }
            return false;
        }

        // PAGE LOAD
        getGames();
}]);