'use strict';

import * as fs from 'fs';
import * as path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import { buildConfg } from '../buildconfig';
import { ModeEnum } from './foundation/modeenum';
import { getServeBaseConfig } from './serveconfig.base';

const packageJson: any = JSON.parse(fs.readFileSync(path.resolve('./package.json')).toString());

export const serverDevConfig: webpack.Configuration = webpackMerge(getServeBaseConfig(ModeEnum.Development), {
	name: 'ServerDevConfig',
	mode: ModeEnum.Development,
	devtool: 'cheap-module-source-map',
	output: {
		filename: '[name].js',
		publicPath: buildConfg.dev.publicPath
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODEENV: JSON.stringify(ModeEnum.Development),
				BROWSER: JSON.stringify(false),
				VERSION: JSON.stringify(packageJson.version)
			}
		})
	]
});
