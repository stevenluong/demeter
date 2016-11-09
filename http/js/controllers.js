'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', []);
mainControllers.controller('mainCtrl', ['$scope','Statement',
        function($scope,Statement) {
            $scope.statements = Statement.query(function(){
            });
            //Sources.getSources().success(function(response){
            //    console.log(response);
            //});

        }]);
mainControllers.controller('readCtrl', ['$scope','$routeParams','Statement',
        function($scope, $routeParams,Statement) {
            $scope.transactions = [];
            $scope.totalIncome=0;
            $scope.totalOutcome=0;
            console.log($routeParams);
            var transactions = Statement.transactions({id:$routeParams.statementId},{},function(){
                angular.forEach(transactions,function(transaction){
                    $scope.transactions.push(transaction);
                    console.log(transaction);
                    if(transaction.transaction_type=="Outcome"){
                        $scope.totalOutcome=$scope.totalOutcome+parseFloat(transaction.value);
                    }
                    else if(transaction.transaction_type=="Income")
                        $scope.totalIncome=$scope.totalIncome+parseFloat(transaction.value);
                    else 
                        console.log("ERROR in transaction type")
                });
            });
        }]);
