'use strict';

/* Services */

var mainServices = angular.module('mainServices', ['ngResource']);

mainServices.factory('Transaction',function($resource){
    return $resource("http://slapps.fr/demeter/ror/transactions.json/:id")
});
mainServices.factory('Statement',function($resource){
        return $resource("http://slapps.fr/demeter/ror/statements/:id/:subResource.json",{},{
            transactions:{
                params: {subResource: 'transactions'},
                method: 'GET',
                isArray:true
            }
        });
});
