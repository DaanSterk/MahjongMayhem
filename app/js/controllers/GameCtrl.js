angular.module('MahjongMayhem')
    .controller('GameCtrl', ['$scope', '$state', '$filter', 'gameService', 'gamesService', 'gameSocket',  function($scope, $state, $filter, gameService, gamesService, gameSocket) {
        var ctrl = this;
        ctrl.boardId;
        ctrl.spectatorMode;
        ctrl.firstSelectedTile = {"tile": {"id": 0} };

        // Page load
        ctrl.boardId = $state.params.id;
        ctrl.spectatorMode = $state.params.spectatorMode;

        $scope.gameEnd = false;
        $scope.boardMarginTop = 0;

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
                    if (!ctrl.hasMatchesLeft()) {
                        $scope.gameEnd = true;
                        $scope.boardMarginTop = 80;
                    }
                });
        }

        $scope.isTheTileSelected = function (tileId){
            return tileId === ctrl.firstSelectedTile.tile.id;
        };

        $scope.isEvenOrOddRow = function (index){
            return index % 2 == 0 ? "even" : "odd";
        };

        $scope.selectTile = function(selectedTile){
            if (!spectatorMode) {
                if (ctrl.canTheTileBeSelected(selectedTile)) {
                    if (!ctrl.isTileFromTheSameType(ctrl.firstSelectedTile, selectedTile)) {
                        ctrl.firstSelectedTile = selectedTile;
                    } else {
                        ctrl.removeTiles([{tile: ctrl.firstSelectedTile.tile.id}, {tile: selectedTile.tile.id}]);
                        ctrl.matchTile(ctrl.boardId, ctrl.firstSelectedTile._id, selectedTile._id);
                    }
                }
            }
        };

        ctrl.canTheTileBeSelected = function canTheTileBeSelected(selectedTile) {
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
        };

        ctrl.hasMatchesLeft = function hasMatchesLeft() {
            var selectableTiles = new Array();
            var tilesOnBoard = $filter("hasNoMatch")($scope.tiles);
            for (var i = 0; i < tilesOnBoard.length; i++) {
                if (ctrl.canTheTileBeSelected(tilesOnBoard[i])) {
                    selectableTiles.push(tilesOnBoard[i].tile);
                }
            }

            for (var i = 0; i < selectableTiles.length; i++) {
                for (var j = 0; j < selectableTiles.length; j++) {
                    var a = selectableTiles[i];
                    var b = selectableTiles[j];

                    if (a.id !== b.id) {
                        if (a.matchesWholeSuit && b.matchesWholeSuit) {
                            if (a.suit === b.suit) {
                                return true;
                            }
                        }
                        else if (a.suit === b.suit) {
                            if (a.name === b.name) {
                                return true;
                            }
                        }
                    }
                }
            }

            return false;
        }

        ctrl.endGame = function endGame(gameid) {
            gamesService.endGame(gameid)
                .then(function (response) {
                    $state.reload();
                });
        }

        $scope.cheat = function() {
            var selectableTiles = new Array();
            var tilesOnBoard = $filter("hasNoMatch")($scope.tiles);
            for (var i = 0; i < tilesOnBoard.length; i++) {
                if (ctrl.canTheTileBeSelected(tilesOnBoard[i])) {
                    selectableTiles.push(tilesOnBoard[i].tile);
                }
            }

            for (var i = 0; i < selectableTiles.length; i++) {
                for (var j = 0; j < selectableTiles.length; j++) {
                    var a = selectableTiles[i];
                    var b = selectableTiles[j];

                    if (a.id !== b.id) {
                        if (a.matchesWholeSuit && b.matchesWholeSuit) {
                            if (a.suit === b.suit) {
                                alert("Suit: " + a.suit + "; Name: " + a.name);
                                return true;
                            }
                        }
                        else if (a.suit === b.suit) {
                            if (a.name === b.name) {
                                alert("Suit: " + a.suit + "; Name: " + a.name);
                                return true;
                            }
                        }
                    }
                }
            }

            return false;
        }

    }])