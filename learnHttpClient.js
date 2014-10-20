'use strict';
var learnHttpClient = (function(){
	var http = require('http');

	var listenGet = function(url){
		http.get(url,function(response){
			response.setEncoding('utf8');
			response.on('data',function(data){
				console.log(data);
			});
		});
	};

	return {
		listenGet : listenGet
	};
})();

module.exports = learnHttpClient;
