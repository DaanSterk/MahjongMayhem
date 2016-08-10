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

                var expected = true;
                var actual = gameController.isTileFromTheSameType(firstTile, secondTile);

                expect(expected, actual);
            });

            it("Should not match, different suit and name", function () {
                var firstTile = {tile: {tile: {id: 1, suit: "bamboo", name: "1", matchesWholeSuit: false}}};
                var secondTile = {tile: {tile: {id: 2, suit: "circle", name: "3", matchesWholeSuit: false}}};

                var expected = false;
                var actual = gameController.isTileFromTheSameType(firstTile, secondTile);

                expect(expected, actual);
            });

            it("Should match, same suit", function () {
                var firstTile = {tile: {tile: {id: 1, suit: "dragon", name: "blue", matchesWholeSuit: true}}};
                var secondTile = {tile: {tile: {id: 2, suit: "dragon", name: "red", matchesWholeSuit: true}}};

                var expected = true;
                var actual = gameController.isTileFromTheSameType(firstTile, secondTile);

                expect(expected, actual);
            });

            it("Should not match, same tile", function () {
                var firstTile = {tile: {tile: {id: 1, suit: "wind", name: "west", matchesWholeSuit: false}}};
                var secondTile = {tile: {tile: {id: 1, suit: "wind", name: "west", matchesWholeSuit: false}}};

                var expected = false;
                var actual = gameController.isTileFromTheSameType(firstTile, secondTile);

                expect(expected, actual);
            });
        });

        describe("Can the tile be selected", function () {
            it("Tile can be selected", function () {
                var tileArray = [
                    {xPos:0,yPos:0,zPos:0,tile:{_id:1,suit:"Bamboo",name:9,matchesWholeSuit:false,__v:0,id:1},_id:"57aaf741bcdec51100c3dbbb",$$hashKey:"object:1"},
                    {xPos:8,yPos:8,zPos:0,tile:{_id:2,suit:"Bamboo",name:9,matchesWholeSuit:false,__v:0,id:2},_id:"57aaf741bcdec51100c3dc0f",$$hashKey:"object:2"}
                ];

                scope.tiles = tileArray;

                var expected = true;
                var actual = gameController.canTheTileBeSelected(tileArray[0]);

                expect(expected, actual);
            });

            it("There is a tile laying on top of this one", function () {
                var tileArray = [
                    {xPos:0,yPos:0,zPos:0,tile:{_id:1,suit:"Bamboo",name:9,matchesWholeSuit:false,__v:0,id:1},_id:"57aaf741bcdec51100c3dbbb",$$hashKey:"object:1"},
                    {xPos:0,yPos:0,zPos:1,tile:{_id:2,suit:"Dragon",name:"Red",matchesWholeSuit:false,__v:0,id:2},_id:"57aaf741bcdec51100c3dc0f",$$hashKey:"object:2"}
                ];

                scope.tiles = tileArray;

                var expected = false;
                var actual = gameController.canTheTileBeSelected(tileArray[0]);

                expect(expected, actual);
            });

            it("Tile is horizontally surrounded", function () {
                var tileArray = [
                    {xPos:0,yPos:0,zPos:0,tile:{_id:1,suit:"Bamboo",name:9,matchesWholeSuit:false,__v:0,id:1},_id:"57aaf741bcdec51100c3dbbb",$$hashKey:"object:1"},
                    {xPos:2,yPos:0,zPos:0,tile:{_id:2,suit:"Dragon",name:"Red",matchesWholeSuit:false,__v:0,id:2},_id:"57aaf741bcdec51100c3dc0f",$$hashKey:"object:2"},
                    {xPos:4,yPos:0,zPos:0,tile:{_id:3,suit:"Circle",name:7,matchesWholeSuit:false,__v:0,id:3},_id:"57aaf741bcdec51100c3dzzz",$$hashKey:"object:3"}
                ];

                scope.tiles = tileArray;

                var expected = false;
                var actual = gameController.canTheTileBeSelected(tileArray[1]);

                expect(expected, actual);
            });

            it("Tile is vertically surrounded", function () {
                var tileArray = [
                    {xPos:0,yPos:0,zPos:0,tile:{_id:1,suit:"Bamboo",name:9,matchesWholeSuit:false,__v:0,id:1},_id:"57aaf741bcdec51100c3dbbb",$$hashKey:"object:1"},
                    {xPos:0,yPos:2,zPos:0,tile:{_id:2,suit:"Dragon",name:"Red",matchesWholeSuit:false,__v:0,id:2},_id:"57aaf741bcdec51100c3dc0f",$$hashKey:"object:2"},
                    {xPos:0,yPos:4,zPos:0,tile:{_id:3,suit:"Circle",name:7,matchesWholeSuit:false,__v:0,id:3},_id:"57aaf741bcdec51100c3dzzz",$$hashKey:"object:3"}
                ];

                scope.tiles = tileArray;

                var expected = false;
                var actual = gameController.canTheTileBeSelected(tileArray[1]);

                expect(expected, actual);
            });
        });
    });
});