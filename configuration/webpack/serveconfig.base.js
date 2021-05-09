'use strict';

const path = require('path');
const VueLoader = require('vue-loader');
const buildConfg = require('../buildconfig.js');
const rules = require('./common/rules.js');
const alias = require('./common/alias.js');

module.exports = function (mode) {
	return {
		target: 'node',
		entry: {
			'server-bundle': path.resolve(__dirname, '../../', buildConfg.paths.src.base, 'server/entry.ts')
		},
		output: {
			path: path.resolve(__dirname, '../../', buildConfg.paths.output.dist),
			libraryTarget: 'commonjs2'
		},
		module: {
			rules: rules(mode, 'node')
		},
		resolve: {
			extensions: ['.js', '.ts', '.css', '.scss', '.json'],
			modules: [
				path.resolve(__dirname, '../../node_modules')
			],
			alias: alias
		},
		plugins: [
			new VueLoader.VueLoaderPlugin()
		]
	}
};
