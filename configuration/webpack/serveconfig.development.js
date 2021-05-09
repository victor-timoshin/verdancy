'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const buildConfg = require('../buildconfig.js');

module.exports = merge(require('./serveconfig.base.js')('development'), {
	name: 'ServerDevConfig',
	mode: 'development',
	devtool: 'cheap-module-source-map',
	output: {
		filename: '[name].js',
		publicPath: buildConfg.dev.publicPath
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODEENV: JSON.stringify('development'),
				BROWSER: JSON.stringify(false)
			}
		})
	]
});
