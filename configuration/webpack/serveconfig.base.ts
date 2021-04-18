'use strict';

import path from 'path';
import webpack from 'webpack';
import { buildConfg } from '../buildconfig';
import { getAlias } from './common/alias';
import { getRules } from './common/rules';
import { ModeEnum } from './foundation/modeenum';
import { TargetEnum } from './foundation/targetenum';
import { webpackContext } from './webpackcontext';

const VueLoader = require('vue-loader');

export const getServeBaseConfig = (mode: ModeEnum): webpack.Configuration => {
	return {
		target: TargetEnum.Node,
		entry: {
			'server-bundle': path.resolve(webpackContext, buildConfg.paths.src.base, 'server/entry.ts')
		},
		output: {
			path: path.resolve(webpackContext, buildConfg.paths.output.dist),
			libraryTarget: 'commonjs2'
		},
		module: {
			rules: [...getRules(mode, TargetEnum.Node)]
		},
		resolve: {
			extensions: ['.js', '.ts', '.css', '.scss', '.json'],
			modules: [
				path.resolve(webpackContext, 'node_modules')
			],
			alias: getAlias(webpackContext)
		},
		plugins: [
			new VueLoader.VueLoaderPlugin()
		]
	}
};
