angular.module('MahjongMayhem').factory('socket', function () {
    return {
        connect: connect,
        match: match,
        finished: finished
    };

    var socket;

    function connect(gameId) {
        if (io) {
            socket = io.connect('http://mahjongmayhem.herokuapp.com?gameId=' + gameId);
        }
    }

    function match(callback) {
        socket.on("match", function (data) {
            if (callback) callback(data);
        });
    }

    function gameover(callback) {
        socket.on("gameover", function (data) {
            if (callback) callback(data);
        });
    }
});