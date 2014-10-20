'use strict';
global.hello = (function(){
	var printhello = function(){
		console.log('HELLO WORLD');
	};

	return {
		printhello:printhello
	};
})();

hello.printhello();
