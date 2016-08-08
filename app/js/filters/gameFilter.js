angular.module('MahjongMayhem')
    .filter('hasNoMatch', function() {
        return function(tiles) {
            var result = [];
            if(tiles) {
                tiles.forEach(function (tile) {
                    if (!tile.match) {
                        result.push(tile);
                    }
                });
            }
            return result;
        };
    })
    .filter('hasAMatch', function() {
        return function(tiles) {
            var result = [];
            if(tiles) {
                tiles.forEach(function (tile) {
                    if (tile.match) {
                        result.push(tile);
                    }
                });
            }
            return result;
        };
    })
    .filter('removeSameTiles', function() {
        return function(tiles) {
            var result = [];
            if(tiles) {
                tiles.forEach(function (tile) {
                    var inArray = false;

                    result.forEach(function (r) {
                        if(tile.tile.suit == r.tile.suit && tile.tile.name == r.tile.name && tile.match.foundBy == r.match.foundBy && tile.match.foundOn == r.match.foundOn){
                            inArray = true;
                        }
                    });

                    if(!inArray){
                        result.push(tile);
                    }
                });
            }
            return result;
        };
    })

