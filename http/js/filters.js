'use strict'

/* Filters */

angular.module('mainFilters',[]).filter('sourcesFilter', function(){
		return function(news,scope){
		var filteredNews = []
		scope.sources.forEach(function(s){		
				var count = 0;
				news.forEach(function(n){
						if(s.display && s.name==n.source){
						filteredNews.push(n)
						}
						})
				});
		return filteredNews;
		};
		}).filter('tagFilter', function(){
			return function(tags,scope){
			var filteredTags = []
			tags.forEach(function(t){
					//TODO make better filter
					if(t.length>4){
					filteredTags.push(t)
					}
					});
			return filteredTags;
			};
			});
