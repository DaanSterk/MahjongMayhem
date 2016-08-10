angular.module('MahjongMayhem')
    .controller('GamesCtrl', ['$scope', '$state', 'gamesService', function($scope, $state, gamesService) {
        var ctrl = this;
        ctrl.filter;

        // -----DEFAULT------
        $scope.pageSize = 100;
        $scope.pageIndex = 0;
        // ------------------

        $scope.templates = ['Dragon', 'Shanghai', 'Snake', 'Rooster', 'Monkey', 'Ram', 'Ox'];
        $scope.states = ['Open', 'Playing', 'Finished'];

        $scope.changeFilterTemplate = function(template) {
            $scope.filterTemplate = template;
            $scope.search();
        };

        $scope.changeFilterState = function(state) {
            if (state) {
                $scope.filterState = state.toLowerCase();
            }
            else {
                $scope.filterState = state;
            }
            $scope.search();
        };

        $scope.search = function() {
            ctrl.filter = "";
            if ($scope.filterTemplate) {
                ctrl.filter += '&gameTemplate=' + $scope.filterTemplate;
            }
            if ($scope.filterCreator) {
                ctrl.filter += '&createdBy=' + $scope.filterCreator;
            }
            if ($scope.filterPlayer) {
                ctrl.filter += '&player=' + $scope.filterPlayer;
            }
            if ($scope.filterState) {
                ctrl.filter += '&state=' + $scope.filterState;
            }
            ctrl.getGames();
        };


        ctrl.getGames = function() {
            gamesService.getGames($scope.pageSize, $scope.pageIndex, ctrl.filter)
                .then(function (responseData) {
                    $scope.games = responseData;
                });
        };

        ctrl.newGame = function newGame() {
            gamesService.newGame($scope.game)
                .then(function(response) {
                    $state.go('games');
                });
        };

        ctrl.joinGame = function joinGame(gameId) {
            gamesService.joinGame(gameId)
                .then(function () {
                    $state.reload();
                });
        };

        ctrl.isJoinable = function isJoinable(game) {
            var username = localStorage.getItem("user.username");

            if (game.state !== "open"
                || username === null
                || game.createdBy._id === username
                || game.players.length === game.maxPlayers
                || playerCollectionContains(game.players, username)) {
                return false;
            }

            return true;
        };

        ctrl.startGame = function startGame(gameId) {
            gamesService.startGame(gameId)
                .then(function (response) {
                    $state.reload();
                });
        };

        ctrl.isStartable = function isStartable(game) {
            var username = localStorage.getItem("user.username");

            if (game.state !== "open"
                || game.createdBy._id !== username
                || game.players.length < game.minPlayers) {
                return false;
            }

            return true;
        };

        ctrl.deleteGame = function deleteGame(gameId) {
            gamesService.deleteGame(gameId)
                .then(function (response) {
                    $state.reload();
                });
        };

        ctrl.isDeletable = function isDeletable(game) {
            var username = localStorage.getItem("user.username");

            if (game.state !== "playing"
                && game.createdBy._id === username) {

                return true;
            }

            return false;
        };

        ctrl.playGame = function playGame(gameid) {
            $state.go("game", { id: gameid} );
        };

        ctrl.isPlayable = function isPlayable(game) {
            var username = localStorage.getItem("user.username");

            if (game.state !== 'playing'
                || !playerCollectionContains(game.players, username)) {
                return false;
            }

            return true;
        };

        ctrl.isSpectatable = function isSpectatable(game) {
            if (game.state === 'open') {
                return false;
            }

            return true;
        };

        ctrl.spectateGame = function spectateGame(gameid) {
            $state.go("game", { id: gameid, spectatorMode: true });
        };

        function playerCollectionContains(collection, item) { // Determine if player e-mail address is in game players collection.
            for (var i = 0; i < collection.length; i++) {
                if (collection[i]._id === item) {
                    return true;
                }
            }

            return false;
        }

        // PAGE LOAD
        ctrl.getGames();
}]);