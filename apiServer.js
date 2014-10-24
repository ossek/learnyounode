'use strict';
var apiServer = (function(){
       var http = require('http');
       var url = require('url');
       ///api/parsetime :
       //request has a query string with key 'iso' and ISO-format time as value
       ///api/parsetime?iso=2013-08-10T12:10:15.474Z 
       //return json with 'hour' 'minute' 'second' values
       //
       ///api/unixtime :
       //return json with 'unixtime' , in the since unix epoch format
	var createApiServer = function(port){
		var server = http.createServer(function(request,response){
			var parsedUrl = url.parse(request.url);
                       	var method = request.method.toUpperCase();
			var date = tryGetDate(parsedUrl.query);
			if( method === "GET"){
			  if(parsedUrl.pathname.toLowerCase() === '/api/parsetime' && date){
			    var retHms = hourMinuteSecondFromDate(date);
			    writeJsonContentHeader(response);
			    response.write(JSON.stringify(retHms));
			  } else if (parsedUrl.pathname.toLowerCase() === '/api/unixtime' && date){
			    var retUnix = unixTimeFromDate(date);
			    writeJsonContentHeader(response);
			    response.write(JSON.stringify(retUnix));
			  }
			  response.on('end',function(){
				console.log('ending');
			  	response.end();
				return;
			  });
			}
			response.end();
		});
		server.listen(port);
	};

	var unixTimeFromDate = function(date){
		return {
                 unixtime: date.getTime()
                };
	}

	var hourMinuteSecondFromDate = function(date){
		return {
			      hour: date.getHours(),
		              minute: date.getMinutes(),
		              second: date.getSeconds()
		};
	};

	var writeJsonContentHeader = function(response){
		response.writeHead(200,{'Content-Type':'application/json'});
	};

	var tryGetDate = function(query){
            var isoRe = /iso=(.*)&*/;
	    var isoFormat = isoRe.exec(query)[1];
	    var date = new Date(isoFormat);
	    return date;
	};

	return{
		createApiServer: createApiServer
	};
})();

module.exports = apiServer;
