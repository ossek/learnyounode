'use strict';
var fs = require('fs');
var path = require('path');
var filterls = function(dirname,extension,callback){
	fs.readdir(dirname,function(err,list){
		if(err){
			return callback(err);
		}
		var i = 0;
		var result = [];
		for(i; i < list.length; i++){
			var filename = list[i];
			//remove leading period
			var ext = path.extname(filename).substring(1);
			if(ext.toUpperCase() === extension.toUpperCase()){
				result.push(filename);
			}
		}
		return callback(null,result);
	});
};

module.exports = filterls;
