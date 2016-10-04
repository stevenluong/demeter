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
            $scope.totalIncome=0;
            $scope.totalOutcome=0;
            Transactions.getTransactions().success(function(response){
                response.forEach(function(transaction){
                $scope.transactions.push(transaction);
                if(transaction.transaction_type=="Outcome"){
                    $scope.totalOutcome=$scope.totalOutcome+parseFloat(transaction.value);
                }
                else if(transaction.transaction_type=="Income")
                    $scope.totalIncome=$scope.totalIncome+parseFloat(transaction.value);
                else 
                    console.log("ERROR in transaction type")
                })
            });

        }]);
