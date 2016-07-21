angular.module('MahjongMayhem').controller('ThemeCtrl', ['$scope', function($scope) {

    $scope.themeChanger = {
        settings: {
            container: $('body'),
            buttons: $('#theme-control-container > button')
        },

        init: function () {
            var _self = this;

            this.settings.buttons.click(function () {
                var $node = $(this),
                    theme = $node.data('theme');
                _self.settings.container.removeClass().addClass(theme);
                _self.settings.buttons.removeAttr('disabled');
                $node.attr('disabled', true);
            });
        }
    };

    $scope.themeChanger.init();
}]);