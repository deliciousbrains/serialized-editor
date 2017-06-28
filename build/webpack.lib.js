var path = require('path');
var base = require('./webpack.base');

module.exports = Object.assign(base, {
	entry: path.resolve(__dirname, '../src/index.js'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'serialized-editor.js',
		library: 'serialized-editor',
		libraryTarget: 'umd'
	},
	externals: ['vue']
});
