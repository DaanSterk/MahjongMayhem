angular.module('MahjongMayhem').factory('gamesService', function ($http, GLOBALS) {
    return {
        getGames: getGames,
        newGame: newGame,
        joinGame: joinGame,
        startGame: startGame,
        deleteGame: deleteGame
    };

    function getGames(pageSize, pageIndex, filter) {
        var queryStringBase = '?pageSize=' + pageSize + '&pageIndex=' + pageIndex;
        return $http.get(GLOBALS.API_URL + '/games/' + queryStringBase + filter)
            .then(function(response) {
                return response.data;
            });
    }

    function newGame(game) {
        return $http.post(GLOBALS.API_URL + '/games', game)
            .then(function(response) {
                return response;
            });
    }

    function joinGame(gameId) {
        return $http.post(GLOBALS.API_URL + '/games/' + gameId + '/players', {})
            .then(function(response) {
                return response;
            });
    }
    
    function startGame(gameId) {
        return $http.post(GLOBALS.API_URL + '/games/' + gameId + '/start', {})
            .then(function(response) {
                return response;
            });
    }

    function deleteGame(gameId) {
        return $http.delete(GLOBALS.API_URL + '/games/' + gameId, {})
            .then(function(response) {
                return response;
            });
    }
});