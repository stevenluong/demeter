'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', ['ngFileUpload']);
mainControllers.controller('mainCtrl', ['$scope','Sources','Upload',
        function($scope, Sources, Upload) {
            //Sources.getSources().success(function(response){
            //    console.log(response);
            //});

        }]);
