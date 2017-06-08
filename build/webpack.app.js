var path = require('path');
var base = require('./webpack.base');

module.exports = Object.assign(base, {
	entry: path.resolve(__dirname, '../app/main.js'),
	output: {
		path: path.resolve(__dirname, '../app/dist'),
		publicPath: '/dist/',
		filename: 'app.js'
	},
	devServer: {
		contentBase: 'app',
		historyApiFallback: true,
		noInfo: true
	},
	performance: {
		hints: false
	}
});
