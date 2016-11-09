#!/usr/bin/env node

var path = require('path');
var thinkjs = require('thinkjs');
var rootPath = path.dirname(__dirname);


var start = function() {
	var instance = new thinkjs({
		APP_PATH: rootPath + path.sep + 'app',
		RUNTIME_PATH: rootPath + path.sep + 'runtime',
		ROOT_PATH: rootPath,
		RESOURCE_PATH: __dirname,
		env: 'development'
	});

	//compile src/ to app/
	instance.compile({
		retainLines: true,
		log: true
	});

	instance.run();
}


var program = require('commander');

program.usage('[options] name')

program.on('--help', function() {
	console.log();
	console.log('stbui-ide help');
	console.log();
});

