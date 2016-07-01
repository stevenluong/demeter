'use strict';

/* Services */

var mainServices = angular.module('mainServices', ['ngResource']);

mainServices.factory('Sources',function($http){
    var sources = {};
    //sources.getSources = function(){
    //    return $http.get("http://google.com")
    //};	
    return sources;
});
