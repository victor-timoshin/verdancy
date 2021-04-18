'use strict';

import path from 'path';
import webpack from 'webpack';
import { buildConfg } from '../buildconfig';
import { ModeEnum } from './foundation/modeenum';
import { TargetEnum } from './foundation/targetenum';
import { getRules } from './common/rules';
import { getAlias } from './common/alias';
import { webpackContext } from './webpackcontext';

export const getClientBaseConfig = (mode: ModeEnum): webpack.Configuration => {
	return {
		target: TargetEnum.Web,
		output: {
			path: path.resolve(webpackContext, buildConfg.paths.output.dist),
			pathinfo: true
		},
		performance: {
			maxEntrypointSize: 512000,
			maxAssetSize: 512000
		},
		module: {
			rules: [...getRules(mode, TargetEnum.Web)]
		},
		resolve: {
			extensions: ['.js', '.ts', '.vue'],
			modules: [
				path.resolve(webpackContext, 'node_modules')
			],
			alias: getAlias(webpackContext)
		},
		plugins: [
			// Empty
		]
	}
};
