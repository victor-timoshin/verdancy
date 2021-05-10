'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const buildConfg = require('../buildconfig.js');

module.exports = merge(require('./clientconfig.base.js')('development'), {
	name: 'ClientDevConfg',
	mode: 'development',
	devtool: 'cheap-module-source-map',
	entry: {
		'client': [
			`webpack-dev-server/client?http://${buildConfg.dev.hostname}:${buildConfg.dev.port}`,
			'webpack/hot/only-dev-server',
			path.resolve(__dirname, '../../', buildConfg.paths.src.base, 'client/entry')
		]
	},
	output: {
		filename: buildConfg.disabledChunkhash
			? '[name].js'
			: '[name].[fullhash:8].js',
		sourceMapFilename: buildConfg.disabledChunkhash
			? '[file].js.map'
			: '[file].[fullhash:8].js.map',
		chunkFilename: buildConfg.disabledChunkhash
			? '[name].chunk.js'
			: '[name].[fullhash:8].chunk.js',
		hotUpdateChunkFilename: 'hot/[id].hot-update.js',
		hotUpdateMainFilename: 'hot/hot-update.json',
		publicPath: buildConfg.dev.publicPath
	},
	optimization: {
		chunkIds: 'named',
		splitChunks: {
			minChunks: 1,
			cacheGroups: {
				vendors: {
					name: 'chunk-vendors',
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial'
				},
				common: {
					name: 'chunk-common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				},
				components: {
					name: 'chunk-tablewidget',
					test: /[\\/]src[\\/]client[\\/]views[\\/]components[\\/]dynamics[\\/]/,
					chunks: 'all',
					enforce: true
				}
			}
		},
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODEENV: JSON.stringify('development'),
				BROWSER: JSON.stringify(true),
				PORT: buildConfg.realport
			},
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false
		}),
		new HtmlPlugin({
			title: '',
			template: path.resolve(__dirname, '../../', buildConfg.paths.src.layouts, buildConfg.tmpl.master + buildConfg.tmpl.extname),
			filename: path.resolve(__dirname, '../../', buildConfg.paths.output.base, buildConfg.tmpl.master + buildConfg.tmpl.extname),
			minify: false,
			hash: true,
			inject: false,
			injectState: {
				INITIAL_STATE: `<script id='__INITIAL_STATE__' type='application/json'>
					${JSON.stringify({
						ssr: true,
						autoupdate: false,
						symbolname: 'BTCUSDT'
					}).replace(/</g,'\\u003c')}
				</script>`
			},
			urlContent: (content) => content
		}),
		new webpack.HotModuleReplacementPlugin()
	]
});
