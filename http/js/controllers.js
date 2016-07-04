'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', ['ngFileUpload']);
mainControllers.controller('mainCtrl', ['$scope','Sources','Upload',
        function($scope, Sources, Upload) {
            //Sources.getSources().success(function(response){
            //    console.log(response);
            //});

            $scope.submit = function() {
                if ($scope.form.file.$valid && $scope.file) {
                    $scope.upload($scope.file);
                }
            };
            $scope.upload = function (file) {
                Upload.upload({
                    url: 'upload/url',
                    data: {file: file, 'username': $scope.username}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };
            $scope.uploadFiles = function (files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        //Upload.upload({..., data: {file: files[i]}, ...})...;
                    }
                   // Upload.upload({..., data: {file: files}, ...})...;
                }
            }
        }]);
