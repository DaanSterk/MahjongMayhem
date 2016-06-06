angular.module('MahjongMayhem').controller('GamesCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {
    $scope.games = [
        {
            gameTemplate: { _id: "Dragon" },
            createdBy: { _id: "Daan Sterk" },
            minPlayers: 2,
            maxPlayers: 32,
            players: [ { name: "Daan Sterk" }, { name: "Jan Paparazzi" }, { name: "El Shabibi" } ],
            state: "finished"
        },
        {
            gameTemplate: { _id: "Ox" },
            createdBy: { _id: "Daan Sterk" },
            minPlayers: 4,
            maxPlayers: 16,
            players: [ { name: "Daan Sterk" }, { name: "John Rapparoo" }, { name: "Rick Diddely" } ],
            state: "finished"
        }
    ];
}]);