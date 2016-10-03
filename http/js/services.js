'use strict';

/* Services */

var mainServices = angular.module('mainServices', ['ngResource']);

mainServices.factory('Transactions',function($http){
    var transactions= {};
    transactions.getTransactions = function(){
        return $http.get("http://slapps.fr/demeter/ror/transactions.json")
    };	
    return transactions;
});
