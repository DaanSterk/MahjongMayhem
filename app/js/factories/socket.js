angular.module('MahjongMayhem').factory('gameSocket', function (GLOBALS) {
    return {
        connect: connect
    };

    var socket;

    function connect(gameId) {
        if (io) {
            console.log("connect");
            socket = io.connect(GLOBALS.API_URL + "?gameId=" + gameId);
        }
    }

});