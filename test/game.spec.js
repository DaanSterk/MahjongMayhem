/*
 *   TODO: Change this test to a real test
 *   Dit is een voorbeeldtest
 */
describe("PersonController", function() {
    var personController;
    var personService;
    var createNewController;
    var httpBackend;
    var scope;

    // initialize the app
    beforeEach(module('myApp'));

    // Inject the modules and get them in global variables
    beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector){
        // The scope for the controller
        scope = $rootScope.$new();
        // Get the service which will be injected
        personService = $injector.get('PersonService');
        // For mocking the backend
        httpBackend = $httpBackend;

        // Stubbing with sinon
        personService.sayHello = sinon.stub();
        personService.sayHello.withArgs('Martijn').returns('Stub says hi Martijn');
        personService.sayHello.returns('Hi from stub');

        // This is the controller we're going to test
        personController = $controller('PersonController', { $scope: scope });
    }));

    it('should mock the httpbackend', function(){
        // Given
        var person = personService.persons[0];
        var expectedCode = 'WEBS6';
        var expectedError = 'Person not found';
        // Nu expecten we het omdat we in de test zitten.
        // Bij de before of beforeEach kunnen we ook whenPost stubben
        httpBackend
            .expectPOST('http://api.myApp.com/persons/' + person.id + '/courses', { code: expectedCode })
            .respond(404, { err: expectedError });

        // When
        personController.addCourse(person, expectedCode);
        httpBackend.flush(); // Voer synchroon uit ipv asynchroon

        // Then
        expect(scope.error).to.equal(expectedError);
        expect(person.courses).to.have.length(0);
    });
});