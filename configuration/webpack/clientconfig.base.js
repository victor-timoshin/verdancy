'use strict';

const path = require('path');
const buildConfg = require('../buildconfig.js');
const rules = require('./common/rules.js');
const alias = require('./common/alias.js');

module.exports = function (mode) {
	return {
		target: 'web',
		output: {
			path: path.resolve(__dirname, '../../', buildConfg.paths.output.dist),
			pathinfo: true
		},
		performance: {
			maxEntrypointSize: 512000,
			maxAssetSize: 512000
		},
		module: {
			rules: rules(mode, 'web')
		},
		resolve: {
			extensions: ['.js', '.ts', '.css', '.scss', '.map', '.vue'],
			modules: [
				path.resolve(__dirname, '../../node_modules')
			],
			alias: alias
		},
		plugins: [
			// Empty
		]
	}
};
