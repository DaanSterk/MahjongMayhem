angular.module('MahjongMayhem')
    .controller('GameCtrl', ['$scope', '$state', '$http', '$filter', 'GLOBALS', 'gameSocket',  function($scope, $state, $http, $filter, GLOBALS, gameSocket) {
        var id;
        var spectatorMode;
        var firstSelectedTile = {"tile": {"id": 0} };

        // Page load
        id = $state.params.id;
        spectatorMode = $state.params.spectatorMode;

        getTiles(id);

        gameSocket.connect(id);

        gameSocket.match(function(tiles){
            removeTiles(tiles);
            console.log(matchesLeft());
        });

        function getTiles(gameid) {
            if (!gameid) { // Na een refresh vervalt het game id. Terug gaan naar /games.
                $state.go("games");
                return;
            }
            $http.get(GLOBALS.API_URL + '/games/' + gameid + '/tiles')
                .then(function(response) {
                    $scope.tiles = response.data;
                    console.log(matchesLeft());
                });
        }

        $scope.isTheTileSelected = function (tileId){
            return tileId === firstSelectedTile.tile.id ? "selected-tile" : "not-selected-tile";
        };

        $scope.isEvenOrOddRow = function (index){
            return index % 2 == 0 ? "even" : "odd";
        };

        $scope.selectTile = function(selectedTile){
            if(canTheTileBeSelected(selectedTile)){
                if(!isTileFromTheSameType(selectedTile)){
                    firstSelectedTile = selectedTile;
                } else{
                    matchTile(id, firstSelectedTile._id, selectedTile._id)
                }
            }
        };

        function canTheTileBeSelected(selectedTile) {
            if (spectatorMode) {
                return false;
            }

            var canBeSelected = true,
                tileAbove = false,
                tileRight = false,
                tileBelow = false,
                tileLeft = false;

            var id = selectedTile.tile.id;
            var x = selectedTile.xPos;
            var y = selectedTile.yPos;
            var z = selectedTile.zPos;

            $filter('hasNoMatch')($scope.tiles).forEach(function (tile) {
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
            if(firstSelectedTile) {
                if (firstSelectedTile.tile.suit == selectedTile.tile.suit &&
                    ((firstSelectedTile.tile.matchesWholeSuit && selectedTile.tile.matchesWholeSuit) || firstSelectedTile.tile.name == selectedTile.tile.name) &&
                    firstSelectedTile.tile.id != selectedTile.tile.id) {
                    sameType = true;
                }
            }
            return sameType;
        }

        function matchTile(gameId, firstTileId, secondTileId) {
            return $http({
                method: 'POST',
                url: GLOBALS.API_URL + '/Games/' + gameId + '/Tiles/matches',
                data: { tile1Id: firstTileId, tile2Id: secondTileId }
            }).then(function successCallback(response){
                return response;
            });
        };

        function removeTiles(tiles) {
            tiles.forEach(function (tile) {
                $("#tile-" + tile.tile).remove();
            });
        };

        function matchesLeft() {
            var selectableTiles = new Array();
            for (var i = 0; i < $scope.tiles.length; i++) {
                if (canTheTileBeSelected($scope.tiles[i])) {
                    selectableTiles.push($scope.tiles[i].tile);
                }
            }

            console.log(selectableTiles);

            for (var i = 0; i < selectableTiles.length; i++) {
                for (var j = 0; j < selectableTiles.length; j++) {
                    var a = selectableTiles[i];
                    var b = selectableTiles[j];

                    if (a.id !== b.id) {
                        if (a.matchesWholeSuit && b.matchesWholeSuit) {
                            if (a.suit === b.suit) {
                                console.log(a);
                                console.log(b);
                                return true;
                            }
                        }
                        else if (a.suit === b.suit) {
                            if (a.name === b.name) {
                                console.log(a);
                                console.log(b);
                                return true;
                            }
                        }
                    }
                }
            }

            return false;
        }

    }])