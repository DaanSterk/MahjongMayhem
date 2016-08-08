require('angular/angular');
require('angular-ui-router');

window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('./themeLoader');

angular.module('myApp', ['ngMaterial']);

// Create your app
var app = angular.module('MahjongMayhem', ['ui.router']);