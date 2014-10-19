'use strict';
global.learn = (function(){
	var fs = require('fs');

	var countNewlinesInFile = function(){
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
                countNewlinesInFile:countNewlinesInFile
	};
})();

console.log(learn.countNewlinesInFile());


