var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, '../src')
		}
	},
	devtool: '#eval-source-map',
	plugins: [
		// make sure to include the plugin!
		new VueLoaderPlugin()
	]
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.mode = 'production';
	module.exports.optimization = {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				uglifyOptions: {
					compress: false,
					ecma: 6,
					mangle: true
				},
				sourceMap: true
			})
		]
	}
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
