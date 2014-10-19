'use strict';
global.learn = (function(){
	var fs = require('fs');
	var path = require('path');

	var filterLs = function(){
		var args = global.process.argv;
		var dirname = args[2];
		var extension = '.' + args[3];
		fs.readdir(dirname,function(err,list){
			var i = 0;
			var result = [];
			for(i; i < list.length; i++){
				var filename = list[i];
				var ext = path.extname(filename);
				if(ext.toUpperCase() === extension.toUpperCase()){
					result.push(filename);
				}
			}
			console.log(result.join('\n'));
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
			filterLs:filterLs
	};
})();

learn.filterLs();


