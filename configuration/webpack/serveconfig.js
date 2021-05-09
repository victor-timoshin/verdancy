'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const buildConfg = require('../buildconfig.js');

module.exports = merge(require('./serveconfig.base.js')('production'), {
	name: 'ServerConfig',
	mode: 'production',
	devtool: 'inline-source-map',
	output: {
		filename: '[name].js',
		publicPath: buildConfg.urls.publicPath
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true
			})
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODEENV: JSON.stringify('production'),
				BROWSER: JSON.stringify(false)
			}
		})
	]
});
