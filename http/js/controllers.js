'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', []);
mainControllers.controller('mainCtrl', ['$scope','Sources',
        function($scope, Sources) {
            //Sources.getSources().success(function(response){
            //    console.log(response);
            //});
        }]);
