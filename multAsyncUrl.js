'use strict';
var multAsyncUrl = (function(){
	var bl = require('bl');
	var http = require('http');
	//wait for all the results of these 
	//http get requests and printout the results in the order the urls are passed
	var collectMany = function(listOfUrl,callback){
		var listOfResult = [];
		var i = 0;
		var resultCount = 0;
		for(i; i < listOfUrl.length; i++){
		  (function(icopy){
			  http.get(listOfUrl[icopy],function(response){
			  response.pipe(bl(function(err,data){
				  if(err){
					  console.log('problem: ' +err);
				  }
				  var datastr = data.toString();
				  listOfResult[icopy] = datastr;
				  resultCount++;
				  if(resultCount === listOfUrl.length){
					  callback(null,listOfResult);
				  }
			  }));
		  });
		  })(i);
		}
	};

	return {
		collectMany: collectMany
	}
})();

module.exports = multAsyncUrl;
