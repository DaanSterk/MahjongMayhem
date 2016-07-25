require('angular/angular');
require('angular-ui-router');

window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('./themeLoader');

// Create your app
var app = angular.module('MahjongMayhem', ['ui.router']);