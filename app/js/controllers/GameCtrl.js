angular.module('MahjongMayhem')
    .controller('GameCtrl', ['$scope', '$state', '$http', 'GLOBALS', function($scope, $state, $http, GLOBALS) {
        var id;
        var firstSelectedTile = {"tile": {"id": 0} };

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

        $scope.isTheTileSelected = function (tileId){
            return tileId === firstSelectedTile.tile.id ? "selected-tile" : "not-selected-tile";
        };

        $scope.selectTile = function(selectedTile){
            if(canTheTileBeSelected(selectedTile)){
                if(isTileFromTheSameType(selectedTile)){
                    alert("ja");
                }
                else{
                    firstSelectedTile = selectedTile;
                    alert("nee");
                }
            }
        };

        function canTheTileBeSelected(selectedTile) {
            var canBeSelected = true,
                tileAbove = false,
                tileRight = false,
                tileBelow = false,
                tileLeft = false;

            var id = selectedTile.tile.id;
            var x = selectedTile.xPos;
            var y = selectedTile.yPos;
            var z = selectedTile.zPos;

            $scope.tiles.forEach(function (tile) {
                if(tile.tile.id != id) {
                    if (tile.zPos > z &&
                        tile.xPos >= x - 1 && tile.xPos <= x + 1 &&
                        tile.yPos >= y - 1 && tile.yPos <= y + 1) {
                        canBeSelected = false;
                    } else if (tile.zPos == z) {
                        if (tile.yPos >= y - 1 && tile.yPos <= y + 1) {
                            if (tile.xPos == x - 2) {
                                if (tileRight) {
                                    canBeSelected = false;
                                }
                                tileLeft = true;
                            } else if (tile.xPos == x + 2) {
                                if (tileLeft) {
                                    canBeSelected = false;
                                }
                                tileRight = true;
                            }
                        } else if (tile.xPos >= x - 1 && tile.xPos <= x + 1) {
                            if (tile.yPos == y - 2) {
                                if (tileAbove) {
                                    canBeSelected = false;
                                }
                                tileBelow = true;
                            } else if (tile.yPos == y + 2) {
                                if (tileBelow) {
                                    canBeSelected = false;
                                }
                                tileAbove = true;
                            }
                        }
                    }
                }
            });
            return canBeSelected;
        }

        function isTileFromTheSameType(selectedTile){
            var sameType = false;
            // $scope.tiles.forEach(function (tile) {
            if(firstSelectedTile) {
                if (firstSelectedTile.tile.suit == selectedTile.tile.suit && firstSelectedTile.tile.name == selectedTile.tile.name && firstSelectedTile.tile.id != selectedTile.tile.id) {
                    sameType = true;
                }
            }
            // });
            return sameType;
        }
    }])