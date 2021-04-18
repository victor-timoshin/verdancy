'use strict';

import * as fs from 'fs';
import * as path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import { buildConfg } from '../buildconfig';
import { ModeEnum } from './foundation/modeenum';
import { getServeBaseConfig } from './serveconfig.base';

const packageJson: any = JSON.parse(fs.readFileSync(path.resolve('./package.json')).toString());

export const serverConfig: webpack.Configuration = webpackMerge(getServeBaseConfig(ModeEnum.Production), {
	name: 'ServerConfig',
	mode: ModeEnum.Production,
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
				NODEENV: JSON.stringify(ModeEnum.Production),
				BROWSER: JSON.stringify(false),
				VERSION: JSON.stringify(packageJson.version)
			}
		})
	]
});
