'use strict';
var tcpTime = (function(){
	var net = require('net');
	var strftime = require('strftime');

	var createTcpServer = function(port){
		var server = net.createServer(function(socket){
			//write date in 24 hour format "YYYY-MM-DD hh:mm", 
			//month, day, hour, and minute 0 filled 
			//to 2 integers and followed by newline.
			socket.write(strftime('%Y-%m-%d %H:%M') + "\n");
			socket.end();
		});
		server.listen(port);
		return server;
	};

	return{
		createTcpServer:createTcpServer
	}
})();

module.exports = tcpTime;
