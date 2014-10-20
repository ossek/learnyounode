'use strict';
var httpCollector = (function(){
	var http = require('http');
	var bl = require('bl');

	var listenGet = function(url){
		http.get(url,function(response){
			response.pipe(bl(function(err,data){
				var datastr;
				if(err){
					console.log('problem: ' + err);
					return;
				}
				datastr = data.toString();
				console.log(datastr.length);
				console.log(datastr);
			}));
		});
	};

	return {
		listenGet : listenGet
	};
})();

module.exports = httpCollector;
