angular.module('MahjongMayhem').factory('gameSocket', function (GLOBALS) {
    return {
        connect: connect,
        match: match
    };

    var socket;

    function connect(gameId) {
        if (io) {
            console.log("connect");
            socket = io.connect(GLOBALS.API_URL + "?gameId=" + gameId);
        }
    }

    function match(callback){
        socket.on("match", function(data){
            console.log("test");
            if(callback) callback(data);
        });
    }

});