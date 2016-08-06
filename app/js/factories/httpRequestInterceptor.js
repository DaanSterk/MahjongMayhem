angular.module('MahjongMayhem').factory('httpRequestInterceptor', function () {
    return {
        request: function (config) {

            config.headers = {
                'Content-Type': 'application/json',
                'x-username': localStorage.getItem('user.username'),
                'x-token': localStorage.getItem('user.token')
            }

            return config;
        }
    };
});

angular.module('MahjongMayhem').config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});