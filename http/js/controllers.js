'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', []);
mainControllers.controller('mainCtrl', ['$scope',
        function($scope) {
            //Sources.getSources().success(function(response){
            //    console.log(response);
            //});

        }]);
mainControllers.controller('readCtrl', ['$scope','Transactions',
        function($scope, Transactions) {
            $scope.transactions = [];
            Transactions.getTransactions().success(function(response){
                response.forEach(function(transaction){
                $scope.transactions.push(transaction);
                })
            });

        }]);
