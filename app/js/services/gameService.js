angular.module('MahjongMayhem').factory('gameService', function ($http, GLOBALS) {
    return {
        getTiles: getTiles,
        matchTile: matchTile
    };

    function getTiles(gameId) {
        return $http.get(GLOBALS.API_URL + '/games/' + gameId + '/tiles')
            .then(function(response) {
                return response.data;
            });
    }

    function matchTile(gameId, firstTileId, secondTileId) {
        return $http({
            method: 'POST',
            url: GLOBALS.API_URL + '/Games/' + gameId + '/Tiles/matches',
            data: { tile1Id: firstTileId, tile2Id: secondTileId }
        }).then(function successCallback(response){
            return response;
        });
    }
});