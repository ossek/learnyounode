'use strict';
var fileServer = (function(){
	var http = require('http');
	var fs = require('fs');

	var startServingFile = function(port,filename){
	  var server = http.createServer(function(request,response){
		console.log('made a server');
	  	//request and response are both node streams
		var fileStream = fs.createReadStream(filename);
		console.log('writing response...');
		fileStream.pipe(response);
		response.on('end',function(){
		  response.end();
		  console.log('wrote response');
		});
	  });
	  server.listen(port);
	};

	return {
		startServingFile:startServingFile
	}
})();

module.exports = fileServer;
