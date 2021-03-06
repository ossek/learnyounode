'use strict';
global.learn = (function(){
	var fs = require('fs');
	var path = require('path');
	var filterls = require('./filterls');
	var learnHttpClient = require('./learnHttpClient');
	var httpCollector = require('./httpCollector');
	var multAsyncUrl = require('./multAsyncUrl');
	var tcpTime = require('./tcpTime');
	var fileServer = require('./fileServer');
	var httpUpper = require('./httpUpper');
	var apiServer = require('./apiServer');

	var makeApiServer = function() {
		var port = global.process.argv[2];
		apiServer.createApiServer(port);
	};

	var makeHttpUpperServer = function() {
		var port = global.process.argv[2];
		httpUpper(port);
	};

	var makeFileServer = function(){
		var port = global.process.argv[2];
		var filename = global.process.argv[3];
		fileServer.startServingFile(port,filename);
	};

	var makeTcpTimeServer = function(){
		var port = global.process.argv[2];
		var server = tcpTime.createTcpServer(port);
	};

	var listenMultAsyncUrl = function(){
		var urls = global.process.argv.slice(2);
		multAsyncUrl.collectMany(urls,function(err,resultList){
			console.log(resultList.join('\n'));
		});
	};

	var listenUrl = function(){
		httpCollector.listenGet(global.process.argv[2]);
	};

	var filterls_print = function(){
		var dirname = global.process.argv[2];
		var extension = global.process.argv[3];
		if(dirname === null || dirname === undefined || extension === null || extension === undefined){
			console.log("error with args ");
			return;
		}
		filterls(dirname,extension,function(err,filename_list){
			if(err){
				console.write("error: " + err);
				return;
			}
			console.log(filename_list.join('\n'));
		});
	};

       var countNewlinesInFile = function(){
	  var args = global.process.argv;
	  var filename = args[2];
	  var count = 0;
	  fs.readFile(filename,'utf8',function(err,filestr){
		  if(err === null || err === undefined){
                     var lines = filestr.split('\n');            
		     count = lines.length - 1;
		     console.log(count);
		  }

	  });
	};

	var countNewlinesInFileSync = function(){
	  var args = global.process.argv;
	  var filename = args[2];
	  var filebuf = fs.readFileSync(filename);
	  var filestr = filebuf.toString();
	  var linesArr = filestr.split('\n');
	  //no trailing newline on last line
	  return linesArr.length - 1;
	};
	
	var sumCmdLineInts = function(){
	  var args = global.process.argv;
	  var inputs = args.slice(2,args.length);
	  var i = 0;
	  var sum = 0;
	  for(i; i < inputs.length; i++){
	  	sum += Number(inputs[i]);
	  }
	  return sum;
	};

	return {
		sumCmdLineInts: sumCmdLineInts,
                countNewlinesInFile:countNewlinesInFile,
	        filterls_print: filterls_print,
		listenUrl : listenUrl,
                listenMultAsyncUrl : listenMultAsyncUrl,
                makeTcpTimeServer:makeTcpTimeServer,
                makeFileServer:makeFileServer,
		makeHttpUpperServer: makeHttpUpperServer,
		makeApiServer:makeApiServer
	};
})();

learn.makeApiServer();


