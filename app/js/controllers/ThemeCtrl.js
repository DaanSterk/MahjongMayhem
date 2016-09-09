angular.module('MahjongMayhem').controller('ThemeCtrl', ['$scope', function($scope) {

    $scope.themes = [{name: "Funny banana", theme: "banana"}, {name: "Hot cherry", theme: "cherry"}, {name: "Deep purple", theme: "blueberry"}, {name: "Smooth leaf", theme: "leaf"}, {name: "Night sky", theme: "nightsky"}, {name: "Burnt lobster", theme: "anthracite"}];

    $scope.changeThemeOnClick = function (theme) {
        $('body').removeClass().addClass(theme);
        $('#theme-control-container > button').removeAttr('disabled');
        $('button').find("[data-theme='" + theme + "']").attr('disabled', true);

        localStorage.setItem('theme', theme);
    };
}]);