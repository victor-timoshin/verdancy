'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const buildConfg = require('../buildconfig.js');

module.exports = merge(require('./clientconfig.base.js')('production'), {
	name: 'ClientConfig',
	mode: 'production',
	devtool: 'inline-source-map',
	node: {
		//fs: 'empty'
	},
	entry: {
		'client': {
			import: path.resolve(__dirname, '../../', buildConfg.paths.src.base, 'client/entry.ts')
		}
	},
	output: {
		filename: buildConfg.disabledChunkhash
			? '[name].js'
			: '[name].[fullhash:8].js',
		sourceMapFilename: buildConfg.disabledChunkhash
			? '[file].map'
			: '[file].[fullhash:8].map',
		chunkFilename: buildConfg.disabledChunkhash
			? '[name].chunk.js'
			: '[name].[fullhash:8].chunk.js',
		publicPath: buildConfg.urls.publicPath
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
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true
			})
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: buildConfg.disabledChunkhash
				? '[name].css'
				: '[name].[contenthash:8].css',
			chunkFilename: buildConfg.disabledChunkhash
				? '[name].chunk.css'
				: '[name].[contenthash:8].chunk.css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODEENV: JSON.stringify('production'),
				BROWSER: JSON.stringify(true),
				PORT: buildConfg.realport
			},
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: true
		}),
		new HtmlPlugin({
			title: '',
			template: path.resolve(__dirname, '../../', buildConfg.paths.src.layouts, buildConfg.tmpl.master + buildConfg.tmpl.extname),
			filename: path.resolve(__dirname, '../../', buildConfg.paths.output.base, buildConfg.tmpl.master + buildConfg.tmpl.extname),
			hash: false,
			cache: true,
			showErrors: false,
			inject: false,
			injectState: {
				INITIAL_STATE: `<script id='__INITIAL_STATE__' type='application/json'>
					${JSON.stringify({
						autoupdate: true,
						symbolname: 'BTCUSDT'
					}).replace(/</g,'\\u003c')}
				</script>`
			},
			urlContent: (content) => buildConfg.isDebugMode
				? `http://127.0.0.1:${buildConfg.realport}/` + content
				: `http://verdancy.herokuapp.com/` + content,
			minify: false
		}),
		new CompressionPlugin({
			test: /\.js$|\.css$|\.html$/,
			filename: '[path][base].gz',
			algorithm: 'gzip',
			threshold: 10240,
			minRatio: 0.8
		})
	]
});
