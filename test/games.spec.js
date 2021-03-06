describe("GamesCtrl", function() {
    var gamesController;
    var gamesService;
    var createNewController;
    var httpBackend;
    var scope;
    var game;

    // initialize the app
    beforeEach(module('MahjongMayhem'));

    // Inject the modules and get them in global variables
    beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector){
        // The scope for the controller
        scope = $rootScope.$new();
        // Get the service which will be injected
        gameService = $injector.get('gamesService');
        // For mocking the backend
        httpBackend = $httpBackend;

        localStorage.setItem("user.username", "BugsBunny");

        // This is the controller we're going to test
        gamesController = $controller('GamesCtrl', { $scope: scope });
    }));

    describe("Testing the GamesController", function () {
        describe("Is the game joinable", function () {
            it("Should be able to join", function () {
                var game = {_id:"57a9f3ee1d610d11007b5a0c",
                    createdBy:{_id:"a.ketchum@student.avans.nl",name:"Ash Ketchum",__v:0},
                    createdOn:"2016-08-09T15:17:02.045Z",
                    gameTemplate:{_id:"Shanghai",__v:0,id:"Shanghai"},
                    __v:0,
                    players:[{_id:"a.ketchum@student.avans.nl",name:"Ash Ketchum",__v:0,$$hashKey:"object:3777"}],
                    maxPlayers:7,minPlayers:1,state:"open",id:"57a9f3ee1d610d11007b5a0c",$$hashKey:"object:3671"};

                var expected = true;
                var actual = gamesController.isJoinable(game);

                expect(expected, actual);
            });

            it("Should not be able to join", function () {
                var game = {_id:"57a9f3ee1d610d11007b5a0c",
                    createdBy:{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0},
                    createdOn:"2016-08-09T15:17:02.045Z",
                    gameTemplate:{_id:"Shanghai",__v:0,id:"Shanghai"},
                    __v:0,
                    players:[{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0,$$hashKey:"object:3777"}],
                    maxPlayers:7,minPlayers:1,state:"open",id:"57a9f3ee1d610d11007b5a0c",$$hashKey:"object:3671"};

                var expected = false;
                var actual = gamesController.isJoinable(game);

                expect(expected, actual);
            });
        });

        describe("Is it possible to start the game", function () {
            it("Should be able start the game", function () {
                var game = {_id:"57a9f3ee1d610d11007b5a0c",
                    createdBy:{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0},
                    createdOn:"2016-08-09T15:17:02.045Z",
                    gameTemplate:{_id:"Shanghai",__v:0,id:"Shanghai"},
                    __v:0,
                    players:[{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0,$$hashKey:"object:3777"}],
                    maxPlayers:7,minPlayers:1,state:"open",id:"57a9f3ee1d610d11007b5a0c",$$hashKey:"object:3671"};


                var expected = true;
                var actual = gamesController.isStartable(game);

                expect(expected, actual);
            });

            it("Should not be able to start the game", function () {
                var game = {_id:"57a9f3ee1d610d11007b5a0c",
                    createdBy:{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0},
                    createdOn:"2016-08-09T15:17:02.045Z",
                    gameTemplate:{_id:"Shanghai",__v:0,id:"Shanghai"},
                    __v:0,
                    players:[{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0,$$hashKey:"object:3777"}],
                    maxPlayers:13,minPlayers:4,state:"open",id:"57a9f3ee1d610d11007b5a0c",$$hashKey:"object:3671"};


                var expected = false;
                var actual = gamesController.isStartable(game);

                expect(expected, actual);
            });
        });

        describe("Is it possible to delete the game", function () {
            it("Should be able to play", function () {
                var game = {_id:"57a9f3ee1d610d11007b5a0c",
                    createdBy:{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0},
                    createdOn:"2016-08-09T15:17:02.045Z",
                    gameTemplate:{_id:"Shanghai",__v:0,id:"Shanghai"},
                    __v:0,
                    players:[{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0,$$hashKey:"object:3777"}],
                    maxPlayers:7,minPlayers:1,state:"open",id:"57a9f3ee1d610d11007b5a0c",$$hashKey:"object:3671"};

                var expected = true;
                var actual = gamesController.isDeletable(game);

                expect(expected, actual);
            });

            it("Should not be possible to delete the game", function () {
                var game = {_id:"57a9f3ee1d610d11007b5a0c",
                    createdBy:{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0},
                    createdOn:"2016-08-09T15:17:02.045Z",
                    gameTemplate:{_id:"Shanghai",__v:0,id:"Shanghai"},
                    __v:0,
                    players:[{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0,$$hashKey:"object:3777"}],
                    maxPlayers:13,minPlayers:4,state:"playing",id:"57a9f3ee1d610d11007b5a0c",$$hashKey:"object:3671"};

                var expected = false;
                var actual = gamesController.isDeletable(game);

                expect(expected, actual);
            });
        });

        describe("Is it possible to play", function () {
            it("Should be able start the game", function () {
                var game = {_id:"57a9f3ee1d610d11007b5a0c",
                    createdBy:{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0},
                    createdOn:"2016-08-09T15:17:02.045Z",
                    gameTemplate:{_id:"Shanghai",__v:0,id:"Shanghai"},
                    __v:0,
                    players:[{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0,$$hashKey:"object:3777"}],
                    maxPlayers:7,minPlayers:1,state:"open",id:"57a9f3ee1d610d11007b5a0c",$$hashKey:"object:3671"};

                var expected = true;
                var actual = gamesController.isPlayable(game);

                expect(expected, actual);
            });

            it("Should not be possible to play the game", function () {
                var game = {_id:"57a9f3ee1d610d11007b5a0c",
                    createdBy:{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0},
                    createdOn:"2016-08-09T15:17:02.045Z",
                    gameTemplate:{_id:"Shanghai",__v:0,id:"Shanghai"},
                    __v:0,
                    players:[{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0,$$hashKey:"object:3777"}],
                    maxPlayers:13,minPlayers:4,state:"playing",id:"57a9f3ee1d610d11007b5a0c",$$hashKey:"object:3671"};

                var expected = false;
                var actual = gamesController.isPlayable(game);

                expect(expected, actual);
            });
        });

        describe("Is it possible to spectate", function () {
            it("Should be able start the game", function () {
                var game = {_id:"57a9f3ee1d610d11007b5a0c",
                    createdBy:{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0},
                    createdOn:"2016-08-09T15:17:02.045Z",
                    gameTemplate:{_id:"Shanghai",__v:0,id:"Shanghai"},
                    __v:0,
                    players:[{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0,$$hashKey:"object:3777"}],
                    maxPlayers:7,minPlayers:1,state:"playing",id:"57a9f3ee1d610d11007b5a0c",$$hashKey:"object:3671"};

                var expected = true;
                var actual = gamesController.isSpectatable(game);

                expect(expected, actual);
            });

            it("Should not be possible to spectate", function () {
                var game = {_id:"57a9f3ee1d610d11007b5a0c",
                    createdBy:{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0},
                    createdOn:"2016-08-09T15:17:02.045Z",
                    gameTemplate:{_id:"Shanghai",__v:0,id:"Shanghai"},
                    __v:0,
                    players:[{_id:"b.bugs@student.avans.nl",name:"Bugs Bunny",__v:0,$$hashKey:"object:3777"}],
                    maxPlayers:13,minPlayers:4,state:"open",id:"57a9f3ee1d610d11007b5a0c",$$hashKey:"object:3671"};

                var expected = false;
                var actual = gamesController.isSpectatable(game);

                expect(expected, actual);
            });
        });
    });
});