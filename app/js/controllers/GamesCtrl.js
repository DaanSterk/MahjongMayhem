angular.module('MahjongMayhem')
    .controller('GamesCtrl', ['$scope', '$state', 'gamesService', function($scope, $state, gamesService) {

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
            gamesService.getGames($scope.pageSize, $scope.pageIndex, filter)
                .then(function (responseData) {
                    $scope.games = responseData;
                });
        }

        $scope.newGame = function() {
            gamesService.newGame($scope.game)
                .then(function(response) {
                    $state.go('games');
                });
        }

        $scope.joinGame = function(gameId) {
            gamesService.joinGame(gameId)
                .then(function () {
                    $state.reload();
                });
        }

        $scope.isJoinable = function(game) {
            var username = localStorage.getItem("user.username");

            if (game.state !== "open"
                || username === null
                || game.createdBy._id === username
                || game.players.length === game.maxPlayers
                || playerCollectionContains(game.players, username)) {
                return false;
            }

            return true;
        }

        $scope.startGame = function(gameId) {
            gamesService.startGame(gameId)
                .then(function (response) {
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

        $scope.deleteGame = function(gameId) {
            gamesService.deleteGame(gameId)
                .then(function (response) {
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

        $scope.isSpectatable = function(game) {
            if (game.state === 'open') {
                return false;
            }

            return true;
        }

        $scope.spectateGame = function(gameid) {
            $state.go("game", { id: gameid, spectatorMode: true });
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