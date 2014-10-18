'use strict';
global.learn = (function(){
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
		sumCmdLineInts: sumCmdLineInts
	};
})();

console.log(global.learn.sumCmdLineInts());
