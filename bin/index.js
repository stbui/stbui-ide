#!/usr/bin/env node

var thinkjs = require('thinkjs');
var path = require('path');
var program = require('commander');

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
    APP_PATH: rootPath + path.sep + 'app',
    RUNTIME_PATH: rootPath + path.sep + 'runtime',
    ROOT_PATH: rootPath,
    RESOURCE_PATH: __dirname,
    env: 'production'
});

//preload packages before start server.
instance.run(true);


program.usage('[options] name')

program.on('--help', function() {
	console.log();
	console.log('stbui-ide help');
	console.log();
});

