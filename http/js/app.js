'use strict';

/* App Module */

var mainApp = angular.module('mainApp', [
  'ngRoute',
  //'mainAnimations',
  'mainControllers',
  'mainFilters',
  'mainServices'
]);

mainApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/main.html',
        controller: 'mainCtrl'
      }).
    when('/upload', {
        templateUrl: 'partials/upload.html'
      }).
   when('/read', {
        templateUrl: 'partials/read.html',
        controller: 'readCtrl'
      }).

      otherwise({
        redirectTo: '/'
      });
  }]);
