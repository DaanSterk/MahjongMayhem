angular.module('MahjongMayhem')
    .controller('GameCtrl', ['$scope', '$state', '$filter', 'gameService', 'gameSocket',  function($scope, $state, $filter, gameService, gameSocket) {
        var ctrl = this;
        ctrl.boardId;
        ctrl.spectatorMode;
        ctrl.firstSelectedTile = {"tile": {"id": 0} };

        // Page load
        ctrl.boardId = $state.params.id;
        ctrl.spectatorMode = $state.params.spectatorMode;

        getTiles(ctrl.boardId);

        gameSocket.connect(ctrl.boardId);

        gameSocket.match(function(tiles){
            getTiles(ctrl.boardId);
        });

        function getTiles(gameId) {
            if (!gameId) { // Na een refresh vervalt het game id. Terug gaan naar /games.
                $state.go("games");
                return;
            }
            gameService.getTiles(gameId)
                .then(function (responseData) {
                    $scope.tiles = responseData;
                });
        }

        $scope.isTheTileSelected = function (tileId){
            return tileId === ctrl.firstSelectedTile.tile.id ? "selected-tile" : "not-selected-tile";
        };

        $scope.isEvenOrOddRow = function (index){
            return index % 2 == 0 ? "even" : "odd";
        };

        $scope.selectTile = function(selectedTile){
            if(ctrl.canTheTileBeSelected(selectedTile)){
                if(!ctrl.isTileFromTheSameType(ctrl.firstSelectedTile, selectedTile)){
                    ctrl.firstSelectedTile = selectedTile;
                } else{
                    ctrl.removeTiles([{tile: ctrl.firstSelectedTile.tile.id}, {tile: selectedTile.tile.id}]);
                    ctrl.matchTile(ctrl.boardId, ctrl.firstSelectedTile._id, selectedTile._id);
                }
            }
        };

        ctrl.canTheTileBeSelected = function canTheTileBeSelected(selectedTile) {
            if (ctrl.spectatorMode) {
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

        ctrl.isTileFromTheSameType = function isTileFromTheSameType(firstTile, secondTile){
            var sameType = false;
            if(firstTile) {
                if (firstTile.tile.suit == secondTile.tile.suit &&
                    ((firstTile.tile.matchesWholeSuit && secondTile.tile.matchesWholeSuit) || firstTile.tile.name == secondTile.tile.name) &&
                    firstTile.tile.id != secondTile.tile.id) {
                    sameType = true;
                }
            }
            return sameType;
        }

        ctrl.matchTile = function matchTile(gameId, firstTileId, secondTileId) {
            gameService.matchTile(gameId, firstTileId, secondTileId);
        }

        ctrl.removeTiles = function removeTiles(tiles) {
            tiles.forEach(function (tile) {
                $("#tile-" + tile.tile).remove();
            });
        }
    }])