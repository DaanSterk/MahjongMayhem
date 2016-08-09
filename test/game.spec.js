describe("GameCtrl", function() {
    var gameController;
    var gameService;
    var createNewController;
    var httpBackend;
    var scope;

    // initialize the app
    beforeEach(module('MahjongMayhem'));

    // Inject the modules and get them in global variables
    beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector){
        // The scope for the controller
        scope = $rootScope.$new();
        // Get the service which will be injected
        gameService = $injector.get('gameService');
        // For mocking the backend
        httpBackend = $httpBackend;

        // This is the controller we're going to test
        gameController = $controller('GameCtrl', { $scope: scope });
    }));

    describe("Testing the GameController", function () {
        describe("Do the two tiles match", function () {
            it("Should match, same suit and name", function () {
                var firstTile = {tile: {tile: {id: 1, suit: "bamboo", name: "1", matchesWholeSuit: false}}};
                var secondTile = {tile: {tile: {id: 2, suit: "bamboo", name: "1", matchesWholeSuit: false}}};

                expect(gameController.isTileFromTheSameType(firstTile, secondTile), true);
            });

            it("Should not match, different suit and name", function () {
                var firstTile = {tile: {tile: {id: 1, suit: "bamboo", name: "1", matchesWholeSuit: false}}};
                var secondTile = {tile: {tile: {id: 2, suit: "circle", name: "3", matchesWholeSuit: false}}};

                expect(gameController.isTileFromTheSameType(firstTile, secondTile), false);
            });

            it("Should match, same suit", function () {
                var firstTile = {tile: {tile: {id: 1, suit: "dragon", name: "blue", matchesWholeSuit: true}}};
                var secondTile = {tile: {tile: {id: 2, suit: "dragon", name: "red", matchesWholeSuit: true}}};

                expect(gameController.isTileFromTheSameType(firstTile, secondTile), true);
            });

            it("Should not match, same tile", function () {
                var firstTile = {tile: {tile: {id: 1, suit: "wind", name: "west", matchesWholeSuit: false}}};
                var secondTile = {tile: {tile: {id: 1, suit: "wind", name: "west", matchesWholeSuit: false}}};

                expect(gameController.isTileFromTheSameType(firstTile, secondTile), false);
            });
        });
    });
});

// describe("GamesCtrl", function() {
//     var gamesController;
//     var gamesService;
//     var createNewController;
//     var httpBackend;
//     var scope;
//
//     // initialize the app
//     beforeEach(module('MahjongMayhem'));
//
//     // Inject the modules and get them in global variables
//     beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector){
//         // The scope for the controller
//         scope = $rootScope.$new();
//         // Get the service which will be injected
//         gameService = $injector.get('gamesService');
//         // For mocking the backend
//         httpBackend = $httpBackend;
//
//         // This is the controller we're going to test
//         gameController = $controller('GamesCtrl', { $scope: scope });
//     }));
//
//     describe("Testing the GamesController", function () {
//         describe("Is the game joinable", function () {
//             it("Should be able to join", function () {
//                 var firstTile = {tile: {tile: {id: 1, suit: "bamboo", name: "1", matchesWholeSuit: false}}};
//                 var secondTile = {tile: {tile: {id: 2, suit: "bamboo", name: "1", matchesWholeSuit: false}}};
//
//                 expect(isTileFromTheSameType(firstTile, secondTile), true);
//             });
//
//             it("Should not be able to join", function () {
//                 var firstTile = {tile: {tile: {id: 1, suit: "bamboo", name: "1", matchesWholeSuit: false}}};
//                 var secondTile = {tile: {tile: {id: 2, suit: "circle", name: "3", matchesWholeSuit: false}}};
//
//                 expect(isTileFromTheSameType(firstTile, secondTile), false);
//             });
//
//             it("Should match, same suit", function () {
//                 var firstTile = {tile: {tile: {id: 1, suit: "dragon", name: "blue", matchesWholeSuit: true}}};
//                 var secondTile = {tile: {tile: {id: 2, suit: "dragon", name: "red", matchesWholeSuit: true}}};
//
//                 expect(isTileFromTheSameType(firstTile, secondTile), true);
//             });
//
//             it("Should not match, same tile", function () {
//                 var firstTile = {tile: {tile: {id: 1, suit: "wind", name: "west", matchesWholeSuit: false}}};
//                 var secondTile = {tile: {tile: {id: 1, suit: "wind", name: "west", matchesWholeSuit: false}}};
//
//                 expect(isTileFromTheSameType(firstTile, secondTile), false);
//             });
//         });
//     });
// });